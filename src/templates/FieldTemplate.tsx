import React from 'react';
import { BaseControl } from '@wordpress/components';
import type { FieldTemplateProps } from '@rjsf/utils';

import FieldDebugInfo from './FieldDebugInfo';

const FieldTemplate: React.FC<FieldTemplateProps> = ({
    children,
    classNames,
    description,
    errors,
    formData,
    help,
    id,
    label,
    rawErrors,
    rawHelp,
    required,
    schema,
    style,
    uiSchema,
    ...rest
}) => {
    // Extract idSchema from rest props if available
    const idSchema = (rest as any).idSchema;
    // Check if this is an object field - ObjectFieldTemplate handles its own structure
    const isObjectField = schema?.type === 'object' || (schema?.type === undefined && schema?.properties);

    // Check if this is a multi-schema field (anyOf/oneOf) - MultiSchemaFieldTemplate handles its own structure
    // NOTE: allOf is NOT treated as a multi-schema field - RJSF merges allOf schemas into a single schema,
    // so allOf should be handled normally, not routed to MultiSchemaFieldTemplate
    const isMultiSchemaField = schema?.anyOf || schema?.oneOf;

    // For object fields, ObjectFieldTemplate handles labels/descriptions, so we just render children
    // This ensures proper nesting hierarchy
    if (isObjectField) {
        return (
            <div className={classNames} style={style}>
                {children}
                {rawErrors && rawErrors.length > 0 && (
                    <div className="components-base-control__help components-base-control__help--error">
                        {rawErrors.map((error, index) => (
                            <div className="components-notice is-error" key={index}>
                                {typeof error === 'string' ? error : String(error)}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    // For multi-schema fields (anyOf/oneOf), MultiSchemaFieldTemplate handles labels/descriptions
    // We should just render children to avoid duplicate labels
    // allOf is excluded here because RJSF merges allOf schemas before rendering, so it should be handled normally
    if (isMultiSchemaField) {
        return (
            <div className={classNames} style={style}>
                {children}
                {rawErrors && rawErrors.length > 0 && (
                    <div className="components-base-control__help components-base-control__help--error">
                        {rawErrors.map((error, index) => (
                            <div className="components-notice is-error" key={index}>
                                {typeof error === 'string' ? error : String(error)}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    // Get label from uiSchema, label prop, or schema title
    const fieldLabel = label || uiSchema?.['ui:title'] || schema.title || '';

    // Get help text from multiple sources
    const helpText = rawHelp || help || description || schema.description;

    // Get errors - handle both string arrays and ReactElement
    const fieldErrors = rawErrors || (Array.isArray(errors) ? errors : []);
    const errorArray = Array.isArray(fieldErrors) ? fieldErrors : [];

    // Hide label if explicitly set in uiSchema
    const hideLabel = uiSchema?.['ui:options']?.hideLabel === true;

    // Check if a custom widget component is provided directly
    // Custom widgets often handle their own labels, so we should skip BaseControl wrapper
    const hasCustomWidget = uiSchema?.['ui:widget'] && typeof uiSchema['ui:widget'] === 'function';

    // Check if debug mode is enabled
    const showDebug = uiSchema?.['ui:options']?.debug === true;

    // If custom widget is provided, render without BaseControl wrapper to avoid duplicate labels
    // The custom widget will handle its own structure
    if (hasCustomWidget) {
        return (
            <div className={classNames} style={style}>
                {children}
                {errorArray.length > 0 && (
                    <div className="components-base-control__help components-base-control__help--error">
                        {errorArray.map((error, index) => (
                            <div className="components-notice is-error" key={index}>
                                {typeof error === 'string' ? error : String(error)}
                            </div>
                        ))}
                    </div>
                )}
                {showDebug && (
                    <FieldDebugInfo
                        formData={formData}
                        id={id}
                        idSchema={idSchema}
                        schema={schema}
                        uiSchema={uiSchema}
                    />
                )}
            </div>
        );
    }

    return (
        <div className={classNames} style={style}>
            <BaseControl
                className={errorArray.length > 0 ? 'has-error' : ''}
                help={errorArray.length === 0 ? helpText : undefined}
                id={id}
                label={!hideLabel && fieldLabel ? fieldLabel : undefined}
            >
                {!hideLabel && fieldLabel && required && (
                    <span aria-label="required" className="required">
                        {' '}
                        *
                    </span>
                )}
                {children}
            </BaseControl>
            {errorArray.length > 0 && (
                <div className="components-base-control__help components-base-control__help--error">
                    {errorArray.map((error, index) => (
                        <div className="components-notice is-error" key={index}>
                            {typeof error === 'string' ? error : String(error)}
                        </div>
                    ))}
                </div>
            )}
            {showDebug && (
                <FieldDebugInfo
                    formData={formData}
                    id={id}
                    idSchema={idSchema}
                    schema={schema}
                    uiSchema={uiSchema}
                />
            )}
        </div>
    );
};

export default FieldTemplate;
