import React from 'react';
import type { WidgetProps } from '@rjsf/utils';
import { CheckboxControl } from '@wordpress/components';

const CheckboxesWidget: React.FC<WidgetProps> = ({
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
    value = [],
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
                    {required && (
                        <span aria-label="required" className="required">
                            {' '}
                            *
                        </span>
                    )}
                </div>
            )}
            {enumOptions.map((option: { label: string; value: number | string }) => {
                const optionValue = String(option.value);
                const isChecked = Array.isArray(value) && value.includes(optionValue);
                return (
                    <CheckboxControl
                        checked={isChecked}
                        disabled={disabled || readonly}
                        key={optionValue}
                        label={option.label}
                        onBlur={handleBlur}
                        onChange={(checked) => handleChange(optionValue, checked)}
                        onFocus={handleFocus}
                    />
                );
            })}
            {helpText && <div className="components-base-control__help">{helpText}</div>}
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

export default CheckboxesWidget;
