import React, { useState } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
// Import WordPress styles
import "@wordpress/components/build-style/style.css";
// Import theme - using relative path to ensure it works
import wordpressUITheme from "../src/index";

const KitchenSink: React.FC = () => {
  const [formData, setFormData] = useState<any>({});
  const [submittedData, setSubmittedData] = useState<any>(null);

  // Comprehensive schema that tests all widgets and features
  const schema = {
    type: "object",
    title: "WordPress UI Theme - Kitchen Sink Demo",
    description:
      "This form demonstrates all available widgets and templates in the WordPress UI theme",
    required: ["textField", "emailField", "numberField"],
    properties: {
      // Text inputs
      textField: {
        type: "string",
        title: "Text Field",
        description: "Standard text input",
        default: "Default text",
      },
      passwordField: {
        type: "string",
        title: "Password Field",
        description: "Password input",
      },
      emailField: {
        type: "string",
        format: "email",
        title: "Email Field",
        description: "Email input with validation",
      },
      urlField: {
        type: "string",
        format: "uri",
        title: "URL Field",
        description: "URL input",
      },

      // Number inputs
      numberField: {
        type: "number",
        title: "Number Field",
        description: "Number input",
        minimum: 0,
        maximum: 100,
      },
      upDownField: {
        type: "number",
        title: "Up/Down Field",
        description: "Number input with step controls",
        multipleOf: 5,
        minimum: 0,
        maximum: 100,
      },
      rangeField: {
        type: "number",
        title: "Range Field",
        description: "Range slider",
        minimum: 0,
        maximum: 100,
        default: 50,
      },

      // Textarea
      textareaField: {
        type: "string",
        title: "Textarea Field",
        description: "Multi-line text input",
      },

      // Select
      selectField: {
        type: "string",
        title: "Select Field",
        description: "Dropdown select",
        enum: ["option1", "option2", "option3"],
        enumNames: ["Option 1", "Option 2", "Option 3"],
      },

      // Radio
      radioField: {
        type: "string",
        title: "Radio Field",
        description: "Radio button group",
        enum: ["radio1", "radio2", "radio3"],
        enumNames: ["Radio Option 1", "Radio Option 2", "Radio Option 3"],
      },

      // Checkbox
      checkboxField: {
        type: "boolean",
        title: "Checkbox Field",
        description: "Single checkbox",
        default: false,
      },

      // Checkboxes
      checkboxesField: {
        type: "array",
        title: "Checkboxes Field",
        description: "Multiple checkboxes",
        items: {
          type: "string",
          enum: ["check1", "check2", "check3"],
          enumNames: ["Checkbox 1", "Checkbox 2", "Checkbox 3"],
        },
        uniqueItems: true,
      },

      // Date/Time
      dateField: {
        type: "string",
        format: "date",
        title: "Date Field",
        description: "Date picker",
      },
      dateTimeField: {
        type: "string",
        format: "date-time",
        title: "DateTime Field",
        description: "Date and time picker",
      },
      timeField: {
        type: "string",
        format: "time",
        title: "Time Field",
        description: "Time picker",
      },

      // Hidden field
      hiddenField: {
        type: "string",
        title: "Hidden Field",
        description: "Hidden input (check form data)",
        default: "hidden-value",
      },

      // Object field
      objectField: {
        type: "object",
        title: "Object Field",
        description: "Nested object field",
        properties: {
          nestedText: {
            type: "string",
            title: "Nested Text",
          },
          nestedNumber: {
            type: "number",
            title: "Nested Number",
          },
        },
      },

      // Array field
      arrayField: {
        type: "array",
        title: "Array Field",
        description: "Array of strings",
        items: {
          type: "string",
          title: "Array Item",
        },
      },

      // Array of objects
      arrayOfObjects: {
        type: "array",
        title: "Array of Objects",
        description: "Array with object items",
        items: {
          type: "object",
          properties: {
            name: {
              type: "string",
              title: "Name",
            },
            age: {
              type: "number",
              title: "Age",
            },
          },
        },
      },
    },
  };

  const uiSchema = {
    textareaField: {
      "ui:widget": "textarea",
      "ui:options": {
        rows: 5,
      },
    },
    radioField: {
      "ui:widget": "radio",
    },
    checkboxesField: {
      "ui:widget": "checkboxes",
    },
    dateField: {
      "ui:widget": "date",
    },
    dateTimeField: {
      "ui:widget": "datetime",
    },
    timeField: {
      "ui:widget": "time",
    },
    numberField: {
      "ui:widget": "number",
    },
    upDownField: {
      "ui:widget": "updown",
    },
    rangeField: {
      "ui:widget": "range",
    },
    hiddenField: {
      "ui:widget": "hidden",
    },
    objectField: {
      "ui:options": {
        collapsible: true,
        defaultOpen: true,
      },
    },
    arrayField: {
      "ui:options": {
        addButtonText: "Add New Item",
      },
    },
  };

  const handleSubmit = ({ formData }: any) => {
    setSubmittedData(formData);
  };

  const handleError = () => {
    // Handle form errors if needed
  };

  if (!wordpressUITheme) {
    return (
      <div
        style={{
          padding: "20px",
          maxWidth: "800px",
          margin: "0 auto",
          background: "#fff",
        }}
      >
        <h1>Error: Theme Not Loaded</h1>
        <p>Please check the browser console for details.</p>
        <p>
          Make sure the theme is properly imported from '@osahan/wordpress-ui'
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
        background: "#fff",
      }}
    >
      <h1>WordPress UI Theme - Kitchen Sink</h1>
      <p>
        This page demonstrates all available widgets and templates in the
        WordPress UI theme for react-jsonschema-form.
      </p>

      <Form
        schema={schema}
        uiSchema={uiSchema}
        formData={formData}
        validator={validator as any}
        onChange={({ formData }) => setFormData(formData)}
        onSubmit={handleSubmit}
        onError={handleError}
        widgets={wordpressUITheme.widgets}
        templates={wordpressUITheme.templates}
        fields={wordpressUITheme.fields}
      />

      {submittedData && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            background: "#f0f0f0",
            borderRadius: "4px",
          }}
        >
          <h2>Submitted Data:</h2>
          <pre
            style={{
              background: "#fff",
              padding: "10px",
              borderRadius: "4px",
              overflow: "auto",
            }}
          >
            {JSON.stringify(submittedData, null, 2)}
          </pre>
        </div>
      )}

      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          background: "#e8f4f8",
          borderRadius: "4px",
        }}
      >
        <h3>Current Form Data:</h3>
        <pre
          style={{
            background: "#fff",
            padding: "10px",
            borderRadius: "4px",
            overflow: "auto",
            fontSize: "12px",
          }}
        >
          {JSON.stringify(formData, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default KitchenSink;
