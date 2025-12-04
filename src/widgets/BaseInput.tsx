import React from 'react';
import BaseInputTemplate from '../templates/BaseInputTemplate';
import { WidgetProps } from '@rjsf/core';
import { BaseInputTemplateProps } from '@rjsf/utils';

// BaseInput widget that uses BaseInputTemplate
// Convert WidgetProps to BaseInputTemplateProps
const BaseInput: React.FC<WidgetProps> = ({
  id,
  value,
  required,
  disabled,
  readonly,
  onChange,
  onBlur,
  onFocus,
  options = {},
  schema,
  type,
  ...rest
}) => {
  const templateProps: BaseInputTemplateProps = {
    id,
    htmlName: id,
    value: value || '',
    required,
    disabled,
    readonly,
    type: type || 'text',
    onChange,
    onBlur: (id, value) => onBlur(id, value),
    onFocus: (id, value) => onFocus(id, value),
    options,
    schema,
    rawErrors: rest.rawErrors || [],
    ...rest,
  };

  return <BaseInputTemplate {...templateProps} />;
};

export default BaseInput;

