# @osahan/wordpress-ui

A comprehensive WordPress-themed UI component library for [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form). This theme replaces Bootstrap components with WordPress components from `@wordpress/components`, providing a native WordPress admin experience for JSON Schema forms.

## Features

- ✅ **Complete widget coverage** - All standard react-jsonschema-form widgets implemented
- ✅ **WordPress styling** - Uses `@wordpress/components` for consistent WordPress admin UI
- ✅ **Full template support** - All templates including arrays, objects, and error handling
- ✅ **TypeScript support** - Fully typed components
- ✅ **Comprehensive tests** - 100+ unit tests covering all components
- ✅ **Kitchen sink demo** - Interactive demo showcasing all features
- ✅ **WordPress compatible** - No duplicate style loading, works seamlessly in WordPress environments
- ✅ **Scoped CSS** - All styles scoped under `.rjsf` to prevent CSS bleeding

## Installation

```bash
npm install @osahan/wordpress-ui
```

### Peer Dependencies

This package requires the following peer dependencies:

```bash
npm install react react-dom @wordpress/components @rjsf/core
```

- `react`: ^18.0.0
- `react-dom`: ^18.0.0
- `@wordpress/components`: ^28.6.0
- `@rjsf/core`: ^6.1.2

## Quick Start

### Basic Usage (Default Export)

The simplest way to use the WordPress UI theme is to import the default `Form` component:

```jsx
import validator from '@rjsf/validator-ajv8';
import Form from '@osahan/wordpress-ui';

function MyForm() {
  const schema = {
    type: 'object',
    required: ['name', 'email'],
    properties: {
      name: {
        type: 'string',
        title: 'Name',
      },
      email: {
        type: 'string',
        format: 'email',
        title: 'Email Address',
      },
    },
  };

  return (
    <Form
      schema={schema}
      validator={validator}
      onSubmit={({ formData }) => console.log(formData)}
    />
  );
}
```

### Using generateForm() Function

You can also use the `generateForm()` function to create a Form component (useful for TypeScript generics):

```jsx
import validator from '@rjsf/validator-ajv8';
import { generateForm } from '@osahan/wordpress-ui';

const Form = generateForm();

function MyForm() {
  return (
    <Form
      schema={schema}
      validator={validator}
      onSubmit={({ formData }) => console.log(formData)}
    />
  );
}
```

### Advanced: Using withTheme directly

For more control, you can use the theme object with `withTheme` HOC:

```jsx
import { withTheme } from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { wordpressUITheme } from '@osahan/wordpress-ui';

const ThemedForm = withTheme(wordpressUITheme);

function MyForm() {
  return (
    <ThemedForm
      schema={schema}
      validator={validator}
      onSubmit={({ formData }) => console.log(formData)}
    />
  );
}
```

Or use `generateTheme()`:

```jsx
import { withTheme } from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { generateTheme } from '@osahan/wordpress-ui';

const ThemedForm = withTheme(generateTheme());

function MyForm() {
  return (
    <ThemedForm
      schema={schema}
      validator={validator}
      onSubmit={({ formData }) => console.log(formData)}
    />
  );
}
```

## API Exports

This package follows the same pattern as `@rjsf/react-bootstrap`:

- **Default export**: `Form` - Pre-configured Form component with WordPress UI theme
- **`generateForm()`**: Function that returns a Form component (useful for TypeScript generics)
- **`generateTheme()`**: Function that returns the theme object
- **`wordpressUITheme`**: The theme object (alias for `generateTheme()`)

```jsx
// Default export (most common)
import Form from '@osahan/wordpress-ui';

// Named exports
import { generateForm, generateTheme, wordpressUITheme } from '@osahan/wordpress-ui';
```

## Available Widgets

The theme provides 17 widgets, all styled with WordPress components:

### Text Inputs
- **`BaseInput`** / **`TextWidget`** - Standard text input using `TextControl`
- **`PasswordWidget`** - Password input using `TextControl` with type="password"
- **`EmailWidget`** - Email input using `TextControl` with type="email"
- **`URLWidget`** - URL input using `TextControl` with type="url"
- **`TextareaWidget`** - Multi-line text input using `TextareaControl`

### Number Inputs
- **`NumberWidget`** - Number input using `TextControl` with type="number"
- **`UpDownWidget`** - Number input with step controls
- **`RangeWidget`** - Range slider using `RangeControl`

### Selection Widgets
- **`SelectWidget`** - Dropdown selection using `SelectControl`
- **`RadioWidget`** - Radio button group using `RadioControl`
- **`CheckboxWidget`** - Single checkbox using `CheckboxControl`
- **`CheckboxesWidget`** - Multiple checkboxes for array inputs

### Date/Time Widgets
- **`DateWidget`** - Date picker using `TextControl` with type="date"
- **`DateTimeWidget`** - Date and time picker using `TextControl` with type="datetime-local"
- **`TimeWidget`** - Time picker using `TextControl` with type="time"

### Special Widgets
- **`HiddenWidget`** - Hidden input field

## Available Templates

The theme includes 13 templates for comprehensive form rendering:

### Field Templates
- **`FieldTemplate`** - Wraps individual fields with labels, help text, and errors
- **`FieldErrorTemplate`** - Displays field-level validation errors
- **`FieldHelpTemplate`** - Renders help text for fields
- **`BaseInputTemplate`** - Base template for text inputs

### Structure Templates
- **`ObjectFieldTemplate`** - Renders object/group fields with collapsible panels
- **`ArrayFieldTemplate`** - Handles array fields with add/remove functionality
- **`ArrayFieldItemTemplate`** - Template for individual array items
- **`GridTemplate`** - Grid layout support for form fields
- **`WrapIfAdditionalTemplate`** - Handles additional properties in objects

### Special Templates
- **`ErrorListTemplate`** - Displays form-level validation errors using WordPress `Notice`
- **`MultiSchemaFieldTemplate`** - Supports multiple schema selection
- **`OptionalDataControlsTemplate`** - Controls for optional additional data

### Button Templates
- **`AddButton`** - Button for adding array items
- **`SubmitButton`** - Form submission button
- **`CopyButton`** - Copy array item button
- **`MoveUpButton`** - Move item up button
- **`MoveDownButton`** - Move item down button
- **`RemoveButton`** - Remove item button

## Available Fields

- **`TitleField`** - Renders form/section titles
- **`DescriptionField`** - Renders form/section descriptions

## Usage Examples

### Basic Form

```jsx
import validator from '@rjsf/validator-ajv8';
import Form from '@osahan/wordpress-ui';

const schema = {
  type: 'object',
  properties: {
    name: { type: 'string', title: 'Name' },
    email: { type: 'string', format: 'email', title: 'Email' },
  },
};

<Form schema={schema} validator={validator} />
```

### Using Widgets

```jsx
import validator from '@rjsf/validator-ajv8';
import Form from '@osahan/wordpress-ui';

const schema = {
  type: 'object',
  properties: {
    bio: { type: 'string', title: 'Biography' },
    role: {
      type: 'string',
      enum: ['admin', 'editor'],
      enumNames: ['Administrator', 'Editor'],
    },
  },
};

const uiSchema = {
  bio: {
    'ui:widget': 'textarea',
    'ui:options': { rows: 5 },
  },
  role: {
    'ui:widget': 'radio',
  },
};

<Form schema={schema} uiSchema={uiSchema} validator={validator} />
```

### Array Fields

```jsx
import validator from '@rjsf/validator-ajv8';
import Form from '@osahan/wordpress-ui';

const schema = {
  type: 'object',
  properties: {
    tags: {
      type: 'array',
      title: 'Tags',
      items: { type: 'string' },
    },
  },
};

const uiSchema = {
  tags: {
    'ui:options': {
      addButtonText: 'Add Tag',
    },
  },
};

<Form schema={schema} uiSchema={uiSchema} validator={validator} />
```

### Nested Objects with Collapsible Panels

```jsx
import validator from '@rjsf/validator-ajv8';
import Form from '@osahan/wordpress-ui';

const schema = {
  type: 'object',
  properties: {
    user: {
      type: 'object',
      title: 'User Information',
      properties: {
        name: { type: 'string', title: 'Name' },
        email: { type: 'string', format: 'email', title: 'Email' },
      },
    },
  },
};

const uiSchema = {
  user: {
    'ui:options': {
      collapsible: true,      // Enable collapsible panel (default: true)
      defaultOpen: false,     // Start collapsed (default: true, meaning open by default)
    },
  },
};

<Form schema={schema} uiSchema={uiSchema} validator={validator} />
```

### Controlling Accordion State

You can control whether accordions start open or collapsed using the `defaultOpen` option in `ui:options`:

- **`defaultOpen: true`** (default) - Accordion starts **open/expanded**
- **`defaultOpen: false`** - Accordion starts **collapsed/closed**

**Example - Start all accordions collapsed:**

```jsx
const uiSchema = {
  // This accordion will start collapsed
  myObject: {
    'ui:options': {
      defaultOpen: false,  // Accordion will be collapsed initially
    },
  },
  // This accordion will start open (default behavior)
  anotherObject: {
    'ui:options': {
      defaultOpen: true,   // Explicitly set to open (this is the default)
    },
  },
  // Default behavior (open) - no need to specify
  thirdObject: {
    // No ui:options needed - will default to open
  },
};
```

### Debug Mode

You can enable debug mode for any field or object to see its schema, uiSchema, formData, and idSchema. This is useful for troubleshooting form rendering issues.

```jsx
const uiSchema = {
  // Enable debug for a specific field
  myField: {
    'ui:options': {
      debug: true,  // Shows debug panel with schema, uiSchema, formData, and idSchema
    },
  },
  // Enable debug for an object field
  myObject: {
    'ui:options': {
      debug: true,  // Shows debug info for the object
    },
  },
};
```

When debug mode is enabled, a collapsible debug panel will appear below the field showing:
- **Field ID**: The unique identifier for the field
- **Schema**: The JSON schema definition for the field
- **UI Schema**: The UI schema configuration
- **Form Data**: The current form data value for the field
- **ID Schema**: The ID schema structure (for object fields)

This is particularly useful when debugging nested schemas or understanding how RJSF is processing your schema structure.
```

### Readonly Fields

You can make any field read-only (non-editable) using the `readonly` option in `uiSchema`:

```jsx
const uiSchema = {
  // Make a field read-only
  myField: {
    'ui:readonly': true,  // Field will be read-only (non-editable)
  },
  
  // You can also set readonly on the Form component for all fields
  // <Form schema={schema} uiSchema={uiSchema} validator={validator} readonly />
  
  // Or make specific nested fields readonly
  'color.link.value': {
    'ui:readonly': true,  // This specific field will be read-only
  },
};
```

**Options:**
- **`'ui:readonly': true`** - Makes the field read-only (non-editable)
- **`'ui:readonly': false`** or not set - Field is editable (default)

**Note:** Read-only fields are visually disabled and cannot be edited by users. This is useful for displaying computed values, locked fields, or fields that should not be modified.
```

## Controlled Components

When using this theme with controlled components (passing `formData` prop), make sure to handle `onChange` correctly:

```jsx
import { useState } from 'react';
import Form from '@osahan/wordpress-ui';
import validator from '@rjsf/validator-ajv8';

function MyForm() {
  const [formData, setFormData] = useState({});

  const handleChange = ({ formData }) => {
    // Only update if data actually changed to prevent unnecessary re-renders
    setFormData(formData);
  };

  return (
    <Form
      schema={schema}
      formData={formData}
      onChange={handleChange}
      validator={validator}
    />
  );
}
```

**Important**: This package follows the same pattern as `@rjsf/react-bootstrap` - it's a simple theme wrapper around RJSF's Form component. If you're experiencing infinite loops, check:

1. Are you updating `formData` in `onChange` without checking if it actually changed?
2. Are you using deep equality checks before updating state?
3. Is your `onChange` handler causing unnecessary re-renders?

## Styling

### WordPress Environments

**WordPress component styles are NOT automatically imported** to prevent conflicts in WordPress environments where styles are already loaded via `wp_enqueue_style()`. 

In WordPress environments, no action is needed - styles are already available.

### Non-WordPress Environments

For non-WordPress environments (standalone React apps), you need to import WordPress component styles manually:

```jsx
import '@wordpress/components/build-style/style.css';
import Form from '@osahan/wordpress-ui';
```

### CSS Scoping

All custom styles are scoped under `.rjsf` to prevent CSS bleeding into other parts of your application. The library only injects styles for:

- Sticky accordion panel titles
- Nested panel indentation
- Focus highlighting

These styles only apply within RJSF forms and won't affect other WordPress components or your application's styles.

## Demo / Kitchen Sink

A comprehensive demo showcasing all widgets and templates is available:

🌐 **Live Demo:** [View on GitHub Pages](https://osahan.github.io/wordpress-ui/)

The demo is also available locally in the `demo` directory.

### Running the Demo

From the project root:

```bash
npm run demo
```

Or manually:

```bash
cd demo
npm install --legacy-peer-deps
npm run dev
```

The demo will open at `http://localhost:3000` and includes:
- All 17 widgets
- All templates
- Form validation examples
- Real-time form data display
- Array and object field examples

## Development

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Project Structure

```
src/
├── widgets/          # All widget components
├── templates/        # All template components
│   └── buttons/      # Button templates
├── fields/           # Field components
└── index.ts          # Main theme export
```

## API Reference

### Theme Object and Themed Form

The package exports both the theme object and a pre-configured Form component:

```typescript
import Form, { wordpressUITheme } from '@osahan/wordpress-ui';
import { withTheme, type ThemeProps } from '@rjsf/core';

// Use the pre-configured Form component (recommended)
<Form schema={schema} validator={validator} />

// Or use withTheme HOC for advanced usage
const ThemedForm = withTheme(wordpressUITheme);
<ThemedForm schema={schema} validator={validator} />

// Theme structure
const theme: ThemeProps = {
  widgets: {
    BaseInput,
    TextWidget,
    InputWidget,
    SelectWidget,
    CheckboxWidget,
    TextareaWidget,
    RadioWidget,
    CheckboxesWidget,
    NumberWidget,
    PasswordWidget,
    EmailWidget,
    URLWidget,
    DateWidget,
    DateTimeWidget,
    TimeWidget,
    UpDownWidget,
    RangeWidget,
    HiddenWidget,
  },
  templates: {
    ArrayFieldItemTemplate,
    ArrayFieldTemplate,
    BaseInputTemplate,
    ButtonTemplates: {
      AddButton,
      CopyButton,
      MoveDownButton,
      MoveUpButton,
      RemoveButton,
      SubmitButton,
    },
    DescriptionFieldTemplate,
    ErrorListTemplate,
    FieldErrorTemplate,
    FieldHelpTemplate,
    FieldTemplate,
    GridTemplate,
    MultiSchemaFieldTemplate,
    ObjectFieldTemplate,
    OptionalDataControlsTemplate,
    TitleFieldTemplate,
    WrapIfAdditionalTemplate,
  },
  fields: {
    TitleField,
    DescriptionField,
  },
};
```

## Compatibility

- **react-jsonschema-form**: ^6.1.2
- **React**: ^18.0.0
- **@wordpress/components**: ^28.6.0

### WordPress Integration

This library is designed to work seamlessly in WordPress environments:

- ✅ **No duplicate styles** - WordPress component styles are not automatically imported
- ✅ **Scoped CSS** - All custom styles are scoped under `.rjsf` to prevent conflicts
- ✅ **WordPress admin compatibility** - Uses native WordPress components that match admin UI

When using in WordPress, ensure WordPress component styles are enqueued via `wp_enqueue_style()` - the library will use them automatically.

## Contributing

Contributions are welcome! Please ensure all tests pass before submitting a pull request.

## License

MIT

## Related Projects

- [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form) - The core form library
- [@wordpress/components](https://github.com/WordPress/gutenberg/tree/trunk/packages/components) - WordPress component library
- [@rjsf/react-bootstrap](https://github.com/rjsf-team/react-jsonschema-form/tree/main/packages/react-bootstrap) - Bootstrap theme (inspiration)
