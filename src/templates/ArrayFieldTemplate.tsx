import React from 'react';
import { Panel, PanelBody } from '@wordpress/components';
import { buttonId, getUiOptions, type ArrayFieldTemplateProps } from '@rjsf/utils';

/**
 * The `ArrayFieldTemplate` component is the template used to render all items
 * in an array.
 *
 * @param props - The `ArrayFieldTemplateProps` props for the component
 */
const ArrayFieldTemplate: React.FC<ArrayFieldTemplateProps> = ({
    canAdd,
    disabled,
    fieldPathId,
    items,
    onAddClick,
    readonly,
    registry,
    required,
    schema,
    title,
    uiSchema,
}) => {
    const uiOptions = getUiOptions(uiSchema);
    // Get title from uiSchema or schema
    const arrayTitle = title || uiOptions.title || schema.title || '';

    // Get add button text
    const addButtonText: string = uiOptions.addButtonText || `Add ${arrayTitle || 'Item'}`;
    const {
        ButtonTemplates: { AddButton },
    } = registry.templates;

    // Check if items should be in a panel
    const usePanel: boolean = uiOptions.usePanel !== false;

    const content = (
        <>
            {items}
            {canAdd && (
                <div className="rjsf-array-field-add">
                    <AddButton
                        className="rjsf-array-item-add"
                        disabled={disabled || readonly}
                        id={buttonId(fieldPathId, 'add')}
                        onClick={onAddClick}
                        registry={registry}
                        text={addButtonText}
                        uiSchema={uiSchema}
                    ></AddButton>
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
