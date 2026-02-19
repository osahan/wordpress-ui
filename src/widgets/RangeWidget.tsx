import React from 'react';
import type { WidgetProps } from '@rjsf/utils';
import { RangeControl } from '@wordpress/components';

const RangeWidget: React.FC<WidgetProps> = ({
    disabled,
    id,
    label,
    onBlur,
    onChange,
    onFocus,
    options = {},
    rawErrors = [],
    readonly,
    required,
    schema,
    uiSchema,
    value,
}) => {
    const handleChange = (val: number) => {
        onChange(val === undefined ? (options.emptyValue ?? undefined) : val);
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
                disabled={disabled || readonly}
                help={helpText}
                label={widgetLabel}
                max={max}
                min={min}
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                required={required}
                step={step}
                value={numValue}
            />
            {rawErrors.length > 0 && (
                <div className="components-base-control__help components-base-control__help--error">
                    {rawErrors.map((error, index) => (
                        <div className="components-notice is-error" key={index}>
                            {error}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RangeWidget;
