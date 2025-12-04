import React from 'react';
import { TextControl } from '@wordpress/components';
import type { WidgetProps } from '@rjsf/core';

const UpDownWidget: React.FC<WidgetProps> = ({
  id,
  value,
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
  const handleChange = (val: string) => {
    if (val === '' || val === undefined) {
      onChange(options.emptyValue ?? undefined);
    } else {
      const numValue = Number(val);
      onChange(isNaN(numValue) ? undefined : numValue);
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

  // Convert number to string for display
  const stringValue = value !== undefined && value !== null ? String(value) : '';

  // Get step from schema or options
  const step = schema.multipleOf || options.step || 1;

  return (
    <TextControl
      id={id}
      label={widgetLabel}
      value={stringValue}
      type="number"
      step={step}
      required={required}
      disabled={disabled || readonly}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      help={helpText}
      className={rawErrors.length > 0 ? 'has-error' : ''}
    />
  );
};

export default UpDownWidget;

