import React from 'react';
import { Panel, PanelBody } from '@wordpress/components';
import type { ObjectFieldTemplateProps } from '@rjsf/utils';

const ObjectFieldTemplate: React.FC<ObjectFieldTemplateProps> = ({
  title,
  description,
  properties,
  required,
  disabled,
  readonly,
  uiSchema,
  schema,
}) => {
  // Get title from uiSchema or schema
  const objectTitle = title || uiSchema?.['ui:title'] || schema.title || '';

  // Check if this should be collapsible
  const isCollapsible = uiSchema?.['ui:options']?.collapsible !== false;
  const defaultOpen = uiSchema?.['ui:options']?.defaultOpen !== false;

  // If no title, render as a simple div
  if (!objectTitle) {
    return (
      <div className="rjsf-object-field">
        {properties.map((prop) => prop.content)}
      </div>
    );
  }

  return (
    <div className="rjsf-object-field">
      <Panel>
        <PanelBody
          title={objectTitle + (required ? ' *' : '')}
          initialOpen={defaultOpen}
        >
          {description && (
            <p className="components-base-control__help">{description}</p>
          )}
          <div className="rjsf-object-field-properties">
            {properties.map((prop) => prop.content)}
          </div>
        </PanelBody>
      </Panel>
    </div>
  );
};

export default ObjectFieldTemplate;

