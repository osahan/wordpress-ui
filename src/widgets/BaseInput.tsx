import React from 'react';
import type { WidgetProps } from '@rjsf/utils';
import type { BaseInputTemplateProps } from '@rjsf/utils';

import BaseInputTemplate from '../templates/BaseInputTemplate';

// BaseInput widget that uses BaseInputTemplate
// Convert WidgetProps to BaseInputTemplateProps
const BaseInput: React.FC<WidgetProps> = ({
    disabled,
    id,
    onBlur,
    onChange,
    onFocus,
    options = {},
    readonly,
    required,
    schema,
    type,
    value,
    ...rest
}) => {
    const templateProps: BaseInputTemplateProps = {
        disabled,
        htmlName: id,
        id,
        onBlur: (id, value) => onBlur(id, value),
        onChange,
        onFocus: (id, value) => onFocus(id, value),
        options,
        rawErrors: rest.rawErrors || [],
        readonly,
        required,
        schema,
        type: type || 'text',
        value: value || '',
        ...rest,
    };

    return <BaseInputTemplate {...templateProps} />;
};

export default BaseInput;
