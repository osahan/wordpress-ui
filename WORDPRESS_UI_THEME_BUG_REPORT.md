# WordPressUIForm Infinite Update Loop Bug Report

## Error Details

**Error Message:**
```
Error: Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.
```

**Stack Trace:**
```
at checkForNestedUpdates
at scheduleUpdateOnFiber
at Object.enqueueSetState
at push.../node_modules/react/cjs/react.development.js.Component.setState
at Form.componentDidUpdate
at commitLayoutEffectOnFiber
at commitLayoutMountEffects_complete
at commitLayoutEffects_begin
at commitLayoutEffects
at commitRootImpl
```

**Key Observation:** The error occurs when scrolling the page, indicating that the form is triggering `onChange` during re-renders, not just user interactions.

## Root Cause

The `WordPressUIForm` component (from `@osahan/wordpress-ui`) is calling the `onChange` callback in `componentDidUpdate` (or a similar lifecycle method) whenever the `formData` prop changes, even when the change originated from the `onChange` handler itself.

### The Infinite Loop Cycle

1. User interacts with form → `onChange` fires
2. Parent component's `onChange` handler calls `setState` to update context/state
3. `formData` prop changes (because it's derived from state: `formData={state.data}`)
4. `WordPressUIForm` receives new `formData` prop
5. **BUG:** `WordPressUIForm.componentDidUpdate` detects prop change and calls `onChange` again
6. Loop repeats infinitely

### Code Flow

**Parent Component:**
```tsx
<DesignTokensFormComponent
    formData={state.data as ConfigEditorData}  // ← Changes when setState is called
    onChange={onFormChange}  // ← Updates state.data via setState
    // ...
/>
```

**onFormChange handler:**
```tsx
const onFormChange = (data: IChangeEvent) => {
    setState((prev) => {
        return {
            ...prev,
            data: nextConfig,  // ← This causes formData prop to change
        };
    });
    setIsDirty(true);
};
```

## Expected Behavior

The `onChange` callback should **only** be called when:
- User directly interacts with form fields (typing, selecting, etc.)
- User-initiated changes occur

The `onChange` callback should **NOT** be called when:
- Props change due to external state updates
- Component re-renders due to prop changes
- Scrolling or other non-interactive events occur

## Suggested Fix

The `WordPressUIForm` component should:

1. **Track the source of formData changes:**
   - Only call `onChange` if the change originated from user interaction
   - Compare previous and current `formData` to detect if change was user-initiated vs prop-driven

2. **Use controlled component pattern correctly:**
   - If `formData` prop changes externally, update internal state silently
   - Only trigger `onChange` for user-initiated changes

3. **Avoid calling onChange in lifecycle methods:**
   - Remove or guard `onChange` calls in `componentDidUpdate`
   - Use refs or flags to track whether updates are user-initiated

## Minimal Reproduction

```tsx
const [formData, setFormData] = useState({ name: '' });

const handleChange = (event: IChangeEvent) => {
    // This causes formData prop to change
    setFormData(event.formData);
};

<WordPressUIForm
    formData={formData}  // ← Changes when setFormData is called
    onChange={handleChange}  // ← This triggers setFormData
    schema={schema}
/>
```

**Result:** Infinite loop - `handleChange` → `setFormData` → prop change → `componentDidUpdate` → `onChange` → repeat

## Additional Context

- **RJSF Version:** `@rjsf/core@^6.0.2`
- **Theme Package:** `@osahan/wordpress-ui@^0.1.2`
- **React Version:** `^18.3.0`
- **Trigger:** The issue occurs when scrolling, suggesting the form is re-rendering and incorrectly detecting changes

## Workaround Attempts

We tried several workarounds but they didn't resolve the root issue:

1. ✅ Deep comparison of formData before updating state - **Helps but doesn't fix root cause**
2. ✅ Using refs to prevent recursive updates - **Helps but doesn't fix root cause**
3. ✅ Memoizing callbacks and formData - **Helps but doesn't fix root cause**

The issue persists because the theme component itself is calling `onChange` inappropriately during lifecycle updates.

## Recommendation

The fix needs to be in the `WordPressUIForm` component itself. It should distinguish between:
- **User-initiated changes** (should trigger `onChange`)
- **Prop-driven updates** (should NOT trigger `onChange`)

This is a common pattern in controlled React components and should be handled at the component level, not by consumers.

## Additional Note

While the primary issue is in the theme component, there's also a potential issue in the consumer code where `selectedSection` is in the dependency array of a `useEffect` that calls `setSelectedSection`. However, this is a separate concern and the main infinite loop is definitively caused by the theme component calling `onChange` in `componentDidUpdate`.
