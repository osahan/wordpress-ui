import React from 'react';
import { RadioControl } from '@wordpress/components';
import type { WidgetProps } from '@rjsf/utils';

const RadioWidget: React.FC<WidgetProps> = ({
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
    onChange(val === '' ? options.emptyValue ?? '' : val);
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

  // Transform enumOptions to RadioControl format
  const radioOptions =
    options.enumOptions?.map((option: { label: string; value: string | number }) => ({
      label: option.label,
      value: String(option.value),
    })) || [];

  return (
    <RadioControl
      id={id}
      label={widgetLabel}
      selected={value ? String(value) : ''}
      required={required}
      disabled={disabled || readonly}
      options={radioOptions}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      help={helpText}
      className={rawErrors.length > 0 ? 'has-error' : ''}
    />
  );
};

export default RadioWidget;

