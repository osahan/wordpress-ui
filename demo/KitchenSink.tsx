import React, { useState } from "react";
import validator from "@rjsf/validator-ajv8";
import type { RJSFSchema } from "@rjsf/utils";
// Import WordPress styles
import "@wordpress/components/build-style/style.css";
// Import themed Form component
import Form from "../src/index";

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

      // Object field with nested structure
      objectField: {
        type: "object",
        title: "Parent Object",
        description: "Parent object field with nested children",
        properties: {
          nestedText: {
            type: "string",
            title: "Nested Text",
          },
          nestedNumber: {
            type: "number",
            title: "Nested Number",
          },
          childObject: {
            type: "object",
            title: "Child Object",
            description: "Child object nested inside parent",
            properties: {
              childText: {
                type: "string",
                title: "Child Text Field",
              },
              grandchildObject: {
                type: "object",
                title: "Grandchild Object",
                description: "Grandchild object nested inside child",
                properties: {
                  grandchildText: {
                    type: "string",
                    title: "Grandchild Text",
                  },
                  grandchildNumber: {
                    type: "number",
                    title: "Grandchild Number",
                  },
                },
              },
            },
          },
          siblingObject: {
            type: "object",
            title: "Sibling Object",
            description: "Another child object at the same level",
            properties: {
              siblingText: {
                type: "string",
                title: "Sibling Text",
              },
            },
          },
        },
      },
      // Complex nested color schema test
      color: {
        type: "object",
        title: "Color Configuration",
        properties: {
          link: {
            type: "object",
            title: "Color Link",
            properties: {
              value: {
                type: "string",
                title: "Link Color Value",
              },
              type: {
                type: "string",
                title: "Link Color Type",
              },
            },
          },
          theme1: {
            type: "object",
            title: "Color Theme 1",
            properties: {
              value: {
                type: "string",
                title: "Theme 1 Value",
              },
              type: {
                type: "string",
                title: "Theme 1 Type",
              },
            },
          },
          neutral: {
            type: "object",
            title: "Neutral Colors",
            properties: {
              black: {
                type: "object",
                title: "Color Neutral Black",
                properties: {
                  value: {
                    type: "string",
                    title: "Black Value",
                  },
                  type: {
                    type: "string",
                    title: "Black Type",
                  },
                },
              },
              white: {
                type: "object",
                title: "Color Neutral White",
                properties: {
                  value: {
                    type: "string",
                    title: "White Value",
                  },
                  type: {
                    type: "string",
                    title: "White Type",
                  },
                },
              },
              dark: {
                type: "object",
                title: "Neutral Dark",
                properties: {
                  "5": {
                    type: "object",
                    title: "Color Neutral Dark 5",
                    properties: {
                      value: {
                        type: "string",
                        title: "Dark 5 Value",
                      },
                      type: {
                        type: "string",
                        title: "Dark 5 Type",
                      },
                    },
                  },
                  "10": {
                    type: "object",
                    title: "Color Neutral Dark 10",
                    properties: {
                      value: {
                        type: "string",
                        title: "Dark 10 Value",
                      },
                      type: {
                        type: "string",
                        title: "Dark 10 Type",
                      },
                    },
                  },
                  "20": {
                    type: "object",
                    title: "Color Neutral Dark 20",
                    properties: {
                      value: {
                        type: "string",
                        title: "Dark 20 Value",
                      },
                      type: {
                        type: "string",
                        title: "Dark 20 Type",
                      },
                    },
                  },
                },
              },
              light: {
                type: "object",
                title: "Neutral Light",
                properties: {
                  "5": {
                    type: "object",
                    title: "Color Neutral Light 5",
                    properties: {
                      value: {
                        type: "string",
                        title: "Light 5 Value",
                      },
                      type: {
                        type: "string",
                        title: "Light 5 Type",
                      },
                    },
                  },
                  "10": {
                    type: "object",
                    title: "Color Neutral Light 10",
                    properties: {
                      value: {
                        type: "string",
                        title: "Light 10 Value",
                      },
                      type: {
                        type: "string",
                        title: "Light 10 Type",
                      },
                    },
                  },
                },
              },
            },
          },
          pairing: {
            type: "object",
            title: "Color Pairings",
            properties: {
              "1": {
                type: "object",
                title: "Pairing 1",
                properties: {
                  background: {
                    type: "object",
                    title: "Color Pairing 1 Background",
                    properties: {
                      value: {
                        type: "string",
                        title: "Background Value",
                      },
                      type: {
                        type: "string",
                        title: "Background Type",
                      },
                    },
                  },
                  text: {
                    type: "object",
                    title: "Color Pairing 1 Text",
                    properties: {
                      value: {
                        type: "string",
                        title: "Text Value",
                      },
                      type: {
                        type: "string",
                        title: "Text Type",
                      },
                    },
                  },
                  button: {
                    type: "object",
                    title: "Pairing 1 Button",
                    properties: {
                      background: {
                        type: "object",
                        title: "Color Pairing 1 Button Background",
                        properties: {
                          value: {
                            type: "string",
                            title: "Button Background Value",
                          },
                          type: {
                            type: "string",
                            title: "Button Background Type",
                          },
                        },
                      },
                      text: {
                        type: "object",
                        title: "Color Pairing 1 Button Text",
                        properties: {
                          value: {
                            type: "string",
                            title: "Button Text Value",
                          },
                          type: {
                            type: "string",
                            title: "Button Text Type",
                          },
                        },
                      },
                    },
                  },
                },
              },
              "2": {
                type: "object",
                title: "Pairing 2",
                properties: {
                  background: {
                    type: "object",
                    title: "Color Pairing 2 Background",
                    properties: {
                      value: {
                        type: "string",
                        title: "Background Value",
                      },
                      type: {
                        type: "string",
                        title: "Background Type",
                      },
                    },
                  },
                },
              },
            },
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
        debug: true,  // Enable debug mode for this object field
      },
      childObject: {
        "ui:options": {
          collapsible: true,
          defaultOpen: true,
        },
        grandchildObject: {
          "ui:options": {
            collapsible: true,
            defaultOpen: true,
          },
        },
      },
      siblingObject: {
        "ui:options": {
          collapsible: true,
          defaultOpen: true,
        },
      },
    },
    color: {
      "ui:options": {
        collapsible: true,
        defaultOpen: true,
      },
      link: {
        "ui:options": {
          collapsible: true,
          defaultOpen: false,
        },
      },
      theme1: {
        "ui:options": {
          collapsible: true,
          defaultOpen: false,
        },
      },
      neutral: {
        "ui:options": {
          collapsible: true,
          defaultOpen: false,
        },
        black: {
          "ui:options": {
            collapsible: true,
            defaultOpen: false,
          },
        },
        white: {
          "ui:options": {
            collapsible: true,
            defaultOpen: false,
          },
        },
        dark: {
          "ui:options": {
            collapsible: true,
            defaultOpen: false,
          },
          "5": {
            "ui:options": {
              collapsible: true,
              defaultOpen: false,
            },
          },
          "10": {
            "ui:options": {
              collapsible: true,
              defaultOpen: false,
            },
          },
          "20": {
            "ui:options": {
              collapsible: true,
              defaultOpen: false,
            },
          },
        },
        light: {
          "ui:options": {
            collapsible: true,
            defaultOpen: false,
          },
          "5": {
            "ui:options": {
              collapsible: true,
              defaultOpen: false,
            },
          },
          "10": {
            "ui:options": {
              collapsible: true,
              defaultOpen: false,
            },
          },
        },
      },
      pairing: {
        "ui:options": {
          collapsible: true,
          defaultOpen: false,
        },
        "1": {
          "ui:options": {
            collapsible: true,
            defaultOpen: false,
          },
          button: {
            "ui:options": {
              collapsible: true,
              defaultOpen: false,
            },
          },
        },
        "2": {
          "ui:options": {
            collapsible: true,
            defaultOpen: false,
          },
        },
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

  const handleChange = ({ formData }: any) => {
    setFormData(formData);
  };

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
        schema={schema as RJSFSchema}
        uiSchema={uiSchema}
        formData={formData}
        validator={validator as any}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onError={handleError}
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
