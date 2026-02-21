import React from 'react';
import type { WidgetProps } from '@rjsf/utils';
import { TextControl } from '@wordpress/components';

const NumberWidget: React.FC<WidgetProps> = (props) => {
    const {
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
    } = props;
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

    return (
        <TextControl
            className={rawErrors.length > 0 ? 'has-error' : ''}
            disabled={disabled || readonly}
            help={helpText}
            id={id}
            label={widgetLabel}
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            required={required}
            type="number"
            value={stringValue}
        />
    );
};

export default NumberWidget;
