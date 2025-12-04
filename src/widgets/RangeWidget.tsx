import React from 'react';
import { RangeControl } from '@wordpress/components';
import type { WidgetProps } from '@rjsf/utils';

const RangeWidget: React.FC<WidgetProps> = ({
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
  const handleChange = (val: number) => {
    onChange(val === undefined ? options.emptyValue ?? undefined : val);
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

  // Get min, max, and step from schema or options
  const min = schema.minimum ?? options.min ?? 0;
  const max = schema.maximum ?? options.max ?? 100;
  const step = schema.multipleOf ?? options.step ?? 1;

  const numValue = value !== undefined && value !== null ? Number(value) : min;

  return (
    <div className={rawErrors.length > 0 ? 'has-error' : ''}>
      <RangeControl
        label={widgetLabel}
        value={numValue}
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        help={helpText}
        disabled={disabled || readonly}
        required={required}
      />
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

export default RangeWidget;

