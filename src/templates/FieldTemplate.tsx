import React from 'react';
import { BaseControl } from '@wordpress/components';
import { getTemplate, getUiOptions, type FieldTemplateProps } from '@rjsf/utils';

import FieldDebugInfo from './FieldDebugInfo';

const FieldTemplate: React.FC<FieldTemplateProps> = ({
    children,
    classNames,
    description,
    disabled,
    displayLabel,
    errors,
    formData,
    help,
    id,
    label,
    onKeyRename,
    onKeyRenameBlur,
    onRemoveProperty,
    rawDescription,
    rawErrors,
    rawHelp,
    readonly,
    registry,
    required,
    schema,
    style,
    uiSchema,
    ...rest
}) => {
    const uiOptions = getUiOptions(uiSchema);
    const WrapIfAdditionalTemplate = getTemplate<'WrapIfAdditionalTemplate'>(
        'WrapIfAdditionalTemplate',
        registry,
        uiOptions,
    );

    // Extract idSchema from rest props if available
    const idSchema = (rest as any).idSchema;

    // For object fields, ObjectFieldTemplate handles labels/descriptions, so we just render children
    // This ensures proper nesting hierarchy
    const isObjectField = schema?.type === 'object' || (schema?.type === undefined && schema?.properties);
    if (isObjectField) {
        return (
            <div className={classNames} style={style}>
                <WrapIfAdditionalTemplate
                    classNames={classNames}
                    disabled={disabled}
                    displayLabel={displayLabel}
                    id={id}
                    label={label}
                    onKeyRename={onKeyRename}
                    onKeyRenameBlur={onKeyRenameBlur}
                    onRemoveProperty={onRemoveProperty}
                    rawDescription={rawDescription}
                    readonly={readonly}
                    registry={registry}
                    required={required}
                    schema={schema}
                    style={style}
                    uiSchema={uiSchema}
                >
                    {children}
                </WrapIfAdditionalTemplate>
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

    // For multi-schema fields (anyOf/oneOf), MultiSchemaFieldTemplate handles
    // labels/descriptions. We should just render children to avoid duplicate
    // labels.
    // allOf is excluded here because RJSF merges allOf schemas before rendering,
    // so it should be handled normally, not routed to MultiSchemaFieldTemplate
    const isMultiSchemaField = schema?.anyOf || schema?.oneOf;
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

    const sharedContent = (
        <>
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
        </>
    );

    // If custom widget is provided, render without BaseControl wrapper to avoid duplicate labels
    // The custom widget will handle its own structure
    if (hasCustomWidget) {
        return (
            <div className={classNames} style={style}>
                {children}
                {sharedContent}
            </div>
        );
    }

    return (
        <div className={classNames} style={style}>
            <WrapIfAdditionalTemplate
                classNames={classNames}
                disabled={disabled}
                displayLabel={displayLabel}
                id={id}
                label={label}
                onKeyRename={onKeyRename}
                onKeyRenameBlur={onKeyRenameBlur}
                onRemoveProperty={onRemoveProperty}
                rawDescription={rawDescription}
                readonly={readonly}
                registry={registry}
                required={required}
                schema={schema}
                style={style}
                uiSchema={uiSchema}
            >
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
            </WrapIfAdditionalTemplate>
            {sharedContent}
        </div>
    );
};

export default FieldTemplate;
