import React from 'react';
import type { WidgetProps } from '@rjsf/utils';
import { CheckboxControl } from '@wordpress/components';

const CheckboxWidget: React.FC<WidgetProps> = ({
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
    const handleChange = (val: boolean) => {
        onChange(val);
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
        <CheckboxControl
            checked={value || false}
            className={rawErrors.length > 0 ? 'has-error' : ''}
            disabled={disabled || readonly}
            help={helpText}
            id={id}
            label={widgetLabel}
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            required={required}
        />
    );
};

export default CheckboxWidget;
