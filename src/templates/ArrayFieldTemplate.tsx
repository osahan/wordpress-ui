import React from 'react';
import type { ArrayFieldTemplateProps } from '@rjsf/utils';
import { Panel, Button, PanelBody } from '@wordpress/components';

const ArrayFieldTemplate: React.FC<ArrayFieldTemplateProps> = ({
    canAdd,
    disabled,
    items,
    onAddClick,
    readonly,
    required,
    schema,
    title,
    uiSchema,
}) => {
    // Get title from uiSchema or schema
    const arrayTitle = title || uiSchema?.['ui:title'] || schema.title || '';

    // Get add button text
    const addButtonText = uiSchema?.['ui:options']?.addButtonText || `Add ${arrayTitle || 'Item'}`;

    // Check if items should be in a panel
    const usePanel = uiSchema?.['ui:options']?.usePanel !== false;

    const content = (
        <>
            {items &&
                items.map((item, index) => (
                    <div className="rjsf-array-field-item" key={index}>
                        {item}
                    </div>
                ))}
            {canAdd && (
                <div className="rjsf-array-field-add">
                    <Button
                        className="rjsf-array-field-add-button"
                        disabled={disabled || readonly}
                        onClick={onAddClick}
                        variant="secondary"
                    >
                        {addButtonText}
                    </Button>
                </div>
            )}
        </>
    );

    if (usePanel && arrayTitle) {
        return (
            <Panel className="rjsf-array-field">
                <PanelBody title={arrayTitle + (required ? ' *' : '')}>{content}</PanelBody>
            </Panel>
        );
    }

    return (
        <div className="rjsf-array-field">
            {arrayTitle && (
                <div className="rjsf-array-field-title">
                    <strong>{arrayTitle}</strong>
                    {required && (
                        <span aria-label="required" className="required">
                            {' '}
                            *
                        </span>
                    )}
                </div>
            )}
            {content}
        </div>
    );
};

export default ArrayFieldTemplate;
