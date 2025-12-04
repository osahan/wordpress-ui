import React from 'react';
import { Button, Panel, PanelBody } from '@wordpress/components';
import type { ArrayFieldTemplateProps } from '@rjsf/core';

const ArrayFieldTemplate: React.FC<ArrayFieldTemplateProps> = ({
  canAdd,
  disabled,
  idSchema,
  items,
  onAddClick,
  readonly,
  required,
  schema,
  title,
  uiSchema,
  formData,
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
        items.map((element) => (
          <div key={element.index} className="rjsf-array-field-item">
            <div className="rjsf-array-field-item-content">{element.children}</div>
            {element.hasRemove && (
              <div className="rjsf-array-field-item-actions">
                <Button
                  variant="secondary"
                  isDestructive
                  onClick={element.onDropIndexClick(element.index)}
                  disabled={disabled || readonly}
                  className="rjsf-array-field-item-remove"
                >
                  Remove
                </Button>
              </div>
            )}
          </div>
        ))}
      {canAdd && (
        <div className="rjsf-array-field-add">
          <Button
            variant="secondary"
            onClick={onAddClick}
            disabled={disabled || readonly}
            className="rjsf-array-field-add-button"
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
        <PanelBody
          title={
            <>
              {arrayTitle}
              {required && <span className="required" aria-label="required"> *</span>}
            </>
          }
        >
          {content}
        </PanelBody>
      </Panel>
    );
  }

  return (
    <div className="rjsf-array-field">
      {arrayTitle && (
        <div className="rjsf-array-field-title">
          <strong>{arrayTitle}</strong>
          {required && <span className="required" aria-label="required"> *</span>}
        </div>
      )}
      {content}
    </div>
  );
};

export default ArrayFieldTemplate;

