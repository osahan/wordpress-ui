import React from 'react';
import { TextControl } from '@wordpress/components';
import type { WidgetProps } from '@rjsf/core';

const EmailWidget: React.FC<WidgetProps> = ({
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

  return (
    <TextControl
      id={id}
      label={widgetLabel}
      value={value || ''}
      type="email"
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

export default EmailWidget;

