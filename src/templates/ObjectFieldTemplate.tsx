import React from 'react';
import { Panel, PanelBody } from '@wordpress/components';
import type { ObjectFieldTemplateProps } from '@rjsf/utils';
import FieldDebugInfo from './FieldDebugInfo';

const ObjectFieldTemplate: React.FC<ObjectFieldTemplateProps> = ({
  title,
  description,
  properties,
  required,
  disabled,
  readonly,
  uiSchema,
  schema,
  formData,
  ...rest
}) => {
  // Extract idSchema from rest props if available
  const idSchema = (rest as any).idSchema;
  // Get title from uiSchema (explicitly check if it exists, even if empty string)
  // If ui:title is explicitly set (including empty string), use it
  // Otherwise fall back to title prop or schema.title
  const objectTitle = uiSchema && 'ui:title' in uiSchema 
    ? (uiSchema['ui:title'] || '')
    : (title || schema.title || '');

  // Check if this should be collapsible
  const isCollapsible = uiSchema?.['ui:options']?.collapsible !== false;
  
  // Control initial open/collapsed state
  // - If defaultOpen is explicitly set to false, panel starts collapsed
  // - If defaultOpen is true or undefined, panel starts open (default behavior)
  // - Set in uiSchema: { 'ui:options': { defaultOpen: false } }
  const defaultOpen = uiSchema?.['ui:options']?.defaultOpen !== false;

  // Check if any child properties are objects by examining the schema
  // This ensures proper nesting even when parent has no title
  const hasNestedObjects = schema?.properties && Object.values(schema.properties).some(
    (propSchema: any) => propSchema?.type === 'object' || (propSchema?.properties && typeof propSchema.properties === 'object')
  );

  // Check if debug mode is enabled
  const showDebug = uiSchema?.['ui:options']?.debug === true;

  // If no title but has nested objects, render Panel for proper visual nesting
  // WordPress PanelBody can render without title prop (omitted, not empty string)
  // This creates a container for children to nest inside
  if (!objectTitle && hasNestedObjects) {
    // Render Panel without title prop (not empty string) so children Panels can nest visually inside
    // According to WordPress docs, PanelBody without title renders but stays open
    return (
      <div className="rjsf-object-field">
        <Panel>
          <PanelBody
            initialOpen={defaultOpen}
          >
            {description && (
              <p className="components-base-control__help">{description}</p>
            )}
            {showDebug && idSchema && (
              <FieldDebugInfo
                id={idSchema.$id || ''}
                schema={schema}
                uiSchema={uiSchema}
                formData={formData}
                idSchema={idSchema}
              />
            )}
            <div className="rjsf-object-field-properties">
              {properties.map((prop) => prop.content)}
            </div>
          </PanelBody>
        </Panel>
      </div>
    );
  }

  // If no title and no nested objects, render simple container
  if (!objectTitle) {
    return (
      <div className="rjsf-object-field">
        {showDebug && idSchema && (
          <FieldDebugInfo
            id={idSchema.$id || ''}
            schema={schema}
            uiSchema={uiSchema}
            formData={formData}
            idSchema={idSchema}
          />
        )}
        <div className="rjsf-object-field-properties">
          {properties.map((prop) => prop.content)}
        </div>
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
          {showDebug && idSchema && (
            <FieldDebugInfo
              id={idSchema.$id || ''}
              schema={schema}
              uiSchema={uiSchema}
              formData={formData}
              idSchema={idSchema}
            />
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

