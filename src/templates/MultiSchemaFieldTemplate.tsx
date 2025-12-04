import React from 'react';
import { MultiSchemaFieldTemplateProps, getTemplate, getUiOptions } from '@rjsf/utils';
import { SelectControl } from '@wordpress/components';

const MultiSchemaFieldTemplate: React.FC<MultiSchemaFieldTemplateProps> = (props) => {
  const {
    formData,
    id,
    onKeyChange,
    options,
    registry,
    schema,
    uiSchema,
  } = props;

  const uiOptions = getUiOptions(uiSchema);
  const { title: _title, ...selectOptions } = options;
  const { widgets } = registry;
  const { SelectWidget } = widgets;
  const selectWidgetOptions = {
    ...selectOptions,
    enumOptions: options.schemas.map((schema, index) => ({
      label: schema.title || `Option ${index + 1}`,
      value: String(index),
    })),
  };

  return (
    <div className="rjsf-multi-schema-field">
      <SelectWidget
        id={`${id}_schema_selector`}
        schema={{ type: 'string', enum: options.schemas.map((_, index) => String(index)) }}
        value={String(formData ? options.selectedOption : options.selectedOption || 0)}
        onChange={(value) => onKeyChange(value)}
        options={selectWidgetOptions}
        registry={registry}
        uiSchema={uiSchema}
      />
      {options.selectedOption !== undefined && (
        <div className="rjsf-multi-schema-field-content">
          {props.children}
        </div>
      )}
    </div>
  );
};

export default MultiSchemaFieldTemplate;

