import React from 'react';
import type { WidgetProps } from '@rjsf/utils';
import { RadioControl } from '@wordpress/components';

const RadioWidget: React.FC<WidgetProps> = ({
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
    const handleChange = (val: string) => {
        onChange(val === '' ? (options.emptyValue ?? '') : val);
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
        options.enumOptions?.map((option: { label: string; value: number | string }) => ({
            label: option.label,
            value: String(option.value),
        })) || [];

    return (
        <RadioControl
            className={rawErrors.length > 0 ? 'has-error' : ''}
            disabled={disabled || readonly}
            help={helpText}
            id={id}
            label={widgetLabel}
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            options={radioOptions}
            required={required}
            selected={value ? String(value) : ''}
        />
    );
};

export default RadioWidget;
