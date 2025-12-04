import React from 'react';
import { BaseControl } from '@wordpress/components';
import type { FieldTemplateProps } from '@rjsf/utils';

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

  // Get errors - handle both string arrays and ReactElement
  const fieldErrors = rawErrors || (Array.isArray(errors) ? errors : []);
  const errorArray = Array.isArray(fieldErrors) ? fieldErrors : [];

  // Hide label if explicitly set in uiSchema
  const hideLabel = uiSchema?.['ui:options']?.hideLabel === true;

  return (
    <div className={classNames} style={style}>
      <BaseControl
        id={id}
        label={!hideLabel && fieldLabel ? fieldLabel : undefined}
        help={errorArray.length === 0 ? helpText : undefined}
        className={errorArray.length > 0 ? 'has-error' : ''}
      >
        {!hideLabel && fieldLabel && required && (
          <span className="required" aria-label="required"> *</span>
        )}
        {children}
      </BaseControl>
      {errorArray.length > 0 && (
        <div className="components-base-control__help components-base-control__help--error">
          {errorArray.map((error, index) => (
            <div key={index} className="components-notice is-error">
              {typeof error === 'string' ? error : String(error)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FieldTemplate;

