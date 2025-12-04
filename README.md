# @osahan/wordpress-ui

A comprehensive WordPress-themed UI component library for [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form). This theme replaces Bootstrap components with WordPress components from `@wordpress/components`, providing a native WordPress admin experience for JSON Schema forms.

## Features

- ✅ **Complete widget coverage** - All standard react-jsonschema-form widgets implemented
- ✅ **WordPress styling** - Uses `@wordpress/components` for consistent WordPress admin UI
- ✅ **Full template support** - All templates including arrays, objects, and error handling
- ✅ **TypeScript support** - Fully typed components
- ✅ **Comprehensive tests** - 100+ unit tests covering all components
- ✅ **Kitchen sink demo** - Interactive demo showcasing all features

## Installation

```bash
npm install @osahan/wordpress-ui
```

### Peer Dependencies

This package requires the following peer dependencies:

```bash
npm install react react-dom @wordpress/components @rjsf/core
```

- `react`: ^16.8.0 || ^17.0.0 || ^18.0.0
- `react-dom`: ^16.8.0 || ^17.0.0 || ^18.0.0
- `@wordpress/components`: ^19.0.0 || ^20.0.0
- `@rjsf/core`: ^5.0.0

## Quick Start

```jsx
import { Form } from '@rjsf/core';
import wordpressUITheme from '@osahan/wordpress-ui';

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
      theme={wordpressUITheme}
      onSubmit={({ formData }) => console.log(formData)}
    />
  );
}
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
import { Form } from '@rjsf/core';
import wordpressUITheme from '@osahan/wordpress-ui';

const schema = {
  type: 'object',
  properties: {
    name: { type: 'string', title: 'Name' },
    email: { type: 'string', format: 'email', title: 'Email' },
  },
};

<Form schema={schema} theme={wordpressUITheme} />
```

### Using Widgets

```jsx
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

<Form schema={schema} uiSchema={uiSchema} theme={wordpressUITheme} />
```

### Array Fields

```jsx
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

<Form schema={schema} uiSchema={uiSchema} theme={wordpressUITheme} />
```

### Nested Objects

```jsx
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
      collapsible: true,
      defaultOpen: true,
    },
  },
};

<Form schema={schema} uiSchema={uiSchema} theme={wordpressUITheme} />
```

## Styling

WordPress component styles are automatically imported when you use the theme. The styles from `@wordpress/components` ensure all widgets match the WordPress admin interface.

If you need to import styles separately (e.g., for CSS-in-JS setups), you can reference the `style` field in package.json:

```jsx
import '@wordpress/components/build-style/style.css';
```

## Demo / Kitchen Sink

A comprehensive demo showcasing all widgets and templates is available in the `demo` directory.

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

### Theme Object

```typescript
import { ThemeProps } from '@rjsf/core';
import wordpressUITheme from '@osahan/wordpress-ui';

// Theme structure
{
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
}
```

## Compatibility

- **react-jsonschema-form**: ^5.0.0
- **React**: ^16.8.0 || ^17.0.0 || ^18.0.0
- **@wordpress/components**: ^19.0.0 || ^20.0.0

## Contributing

Contributions are welcome! Please ensure all tests pass before submitting a pull request.

## License

MIT

## Related Projects

- [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form) - The core form library
- [@wordpress/components](https://github.com/WordPress/gutenberg/tree/trunk/packages/components) - WordPress component library
- [@rjsf/react-bootstrap](https://github.com/rjsf-team/react-jsonschema-form/tree/main/packages/react-bootstrap) - Bootstrap theme (inspiration)
