import React from 'react';
import { Panel, PanelBody } from '@wordpress/components';
import { buttonId, canExpand, type ObjectFieldTemplateProps } from '@rjsf/utils';

import FieldDebugInfo from './FieldDebugInfo';

/**
 * The `ObjectFieldTemplate` is the template to use to render all the inner
 * properties of an object along with the title and description if available. If
 * the object is expandable, then an `AddButton` is also rendered after all the
 * properties.
 */
const ObjectFieldTemplate: React.FC<ObjectFieldTemplateProps> = ({
  title,
  description,
  fieldPathId,
  onAddProperty,
  properties,
  registry,
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

  const {
    ButtonTemplates: { AddButton },
  } = registry.templates;

  const sharedContent = (
    <>
            {showDebug && idSchema && (
              <FieldDebugInfo
                formData={formData}
                id={idSchema.$id || ''}
                idSchema={idSchema}
                schema={schema}
                uiSchema={uiSchema}
              />
            )}
            <div className="rjsf-object-field-properties">
              {properties.map((prop) => prop.content)}
            </div>
          {canExpand(schema, uiSchema, formData) && (
            <AddButton
              className='rjsf-object-property-expand'
              disabled={disabled || readonly}
              id={buttonId(fieldPathId, 'add')}
              onClick={onAddProperty}
              registry={registry}
              uiSchema={uiSchema}
            />
          )}
  </>)

  let panelContainer: React.FC;
  if (!objectTitle && hasNestedObjects) {
      // If no title but has nested objects, render Panel for proper visual nesting
      // WordPress PanelBody can render without title prop (omitted, not empty string)
      // This creates a container for children to nest inside
        // Render Panel without title prop (not empty string) so children Panels can nest visually inside
        // According to WordPress docs, PanelBody without title renders but stays open
        panelContainer = (children) => (
          <div className="rjsf-object-field">
            <Panel>
              <PanelBody
                initialOpen={defaultOpen}
              >
                {description && (
                  <p className="components-base-control__help">{description}</p>
                )}
                {children}
              </PanelBody>
            </Panel>
          </div>
        );
  } else if (!objectTitle) {
    // If no title and no nested objects, render simple container
    panelContainer = (children) => (
      <div className="rjsf-object-field">
            {children}
      </div>
    );
  } else {
    panelContainer = (children) => (
        <div className="rjsf-object-field">
          <Panel>
            <PanelBody
              initialOpen={defaultOpen}
              title={objectTitle + (required ? ' *' : '')}
            >
              {description && (
                <p className="components-base-control__help">{description}</p>
              )}
              {children}
            </PanelBody>
          </Panel>
        </div>
    )
  }

  return panelContainer(sharedContent)
};

export default ObjectFieldTemplate;
