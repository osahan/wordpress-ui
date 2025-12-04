import React from 'react';
import { BaseControl } from '@wordpress/components';
import type { FieldTemplateProps } from '@rjsf/core';

const FieldTemplate: React.FC<FieldTemplateProps> = ({
  id,
  classNames,
  style,
  label,
  help,
  required,
  description,
  errors,
  children,
  rawErrors,
  rawHelp,
  schema,
  uiSchema,
}) => {
  // Get label from uiSchema, label prop, or schema title
  const fieldLabel = label || uiSchema?.['ui:title'] || schema.title || '';

  // Get help text from multiple sources
  const helpText = rawHelp || help || description || schema.description;

  // Get errors
  const fieldErrors = rawErrors || errors || [];

  // Hide label if explicitly set in uiSchema
  const hideLabel = uiSchema?.['ui:options']?.hideLabel === true;

  return (
    <div className={classNames} style={style}>
      <BaseControl
        id={id}
        label={!hideLabel && fieldLabel ? fieldLabel : undefined}
        help={!fieldErrors.length ? helpText : undefined}
        className={fieldErrors.length > 0 ? 'has-error' : ''}
      >
        {!hideLabel && fieldLabel && required && (
          <span className="required" aria-label="required"> *</span>
        )}
        {children}
      </BaseControl>
      {fieldErrors.length > 0 && (
        <div className="components-base-control__help components-base-control__help--error">
          {fieldErrors.map((error, index) => (
            <div key={index} className="components-notice is-error">
              {error}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FieldTemplate;

