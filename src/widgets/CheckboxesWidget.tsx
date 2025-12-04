import React from 'react';
import { CheckboxControl } from '@wordpress/components';
import type { WidgetProps } from '@rjsf/core';

const CheckboxesWidget: React.FC<WidgetProps> = ({
  id,
  value = [],
  required,
  disabled,
  readonly,
  label,
  onChange,
  onBlur,
  onFocus,
  rawErrors = [],
  schema,
  uiSchema,
  options = {},
}) => {
  const handleChange = (optionValue: string, checked: boolean) => {
    const currentValue = Array.isArray(value) ? value : [];
    if (checked) {
      onChange([...currentValue, optionValue]);
    } else {
      onChange(currentValue.filter((v: string) => v !== optionValue));
    }
  };

  const handleBlur = () => {
    onBlur(id, value);
  };

  const handleFocus = () => {
    onFocus(id, value);
  };

  // Get help text from uiSchema or options
  const helpText = uiSchema?.['ui:help'] || options.help || schema.description;

  // Get label from uiSchema, label prop, or schema title
  const widgetLabel = label || uiSchema?.['ui:title'] || schema.title || '';

  // Get enum options
  const enumOptions = options.enumOptions || [];

  return (
    <div className={`checkboxes-control ${rawErrors.length > 0 ? 'has-error' : ''}`}>
      {widgetLabel && (
        <div className="checkboxes-label">
          {widgetLabel}
          {required && <span className="required" aria-label="required"> *</span>}
        </div>
      )}
      {enumOptions.map((option: { label: string; value: string | number }) => {
        const optionValue = String(option.value);
        const isChecked = Array.isArray(value) && value.includes(optionValue);
        return (
          <CheckboxControl
            key={optionValue}
            label={option.label}
            checked={isChecked}
            onChange={(checked) => handleChange(optionValue, checked)}
            onBlur={handleBlur}
            onFocus={handleFocus}
            disabled={disabled || readonly}
          />
        );
      })}
      {helpText && <div className="components-base-control__help">{helpText}</div>}
      {rawErrors.length > 0 && (
        <div className="components-base-control__help components-base-control__help--error">
          {rawErrors.map((error, index) => (
            <div key={index} className="components-notice is-error">
              {error}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CheckboxesWidget;

