import React, { useEffect, useMemo } from 'react';
import { BaseControl } from '@wordpress/components';
import { MultiSchemaFieldTemplateProps } from '@rjsf/utils';

const MultiSchemaFieldTemplate: React.FC<MultiSchemaFieldTemplateProps> = (props) => {
  const {
    selector,
    optionSchemaField,
    uiSchema,
    schema,
    ...rest
  } = props;

  // Extract available props from rest - RJSF may pass additional props
  const formData = (rest as any).formData;
  const options = (rest as any).options;
  const onOptionChange = (rest as any).onOptionChange;
  const selectedOption = (rest as any).selectedOption;

  // Check if a custom widget component is provided directly in uiSchema
  // When a custom widget is provided, we should hide the selector and only render the optionSchemaField
  // This prevents duplicate widgets from rendering
  const hasCustomWidget = uiSchema?.['ui:widget'] && typeof uiSchema['ui:widget'] === 'function';

  // Auto-detect which anyOf option matches the current form data type
  // This prevents showing multiple fields and ensures only the matching schema option is rendered
  // This is especially important for string/array anyOf schemas where we want to auto-detect based on value type
  const autoDetectedOptionIndex = useMemo(() => {
    if (!options || !Array.isArray(options) || formData === undefined || formData === null) {
      return null;
    }

    // Check form data type and find matching schema option
    const formDataType = Array.isArray(formData) ? 'array' : typeof formData;
    
    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      const optionType = option?.schema?.type;
      
      // Match array type
      if (formDataType === 'array' && optionType === 'array') {
        return i;
      }
      
      // Match string type
      if (formDataType === 'string' && optionType === 'string') {
        return i;
      }
      
      // Match number type
      if (formDataType === 'number' && optionType === 'number') {
        return i;
      }
    }
    
    return null;
  }, [options, formData]);

  // Auto-select the matching option when form data type is detected
  // This ensures only one field is rendered, matching the form data type
  // Also, if there's a custom widget but no formData, auto-select the first option to ensure the field renders
  useEffect(() => {
    if (autoDetectedOptionIndex !== null && onOptionChange && selectedOption !== autoDetectedOptionIndex) {
      onOptionChange(autoDetectedOptionIndex);
    } else if (
      hasCustomWidget && 
      autoDetectedOptionIndex === null && 
      formData === undefined && 
      options && 
      Array.isArray(options) && 
      options.length > 0 &&
      onOptionChange &&
      (selectedOption === undefined || selectedOption === null)
    ) {
      // When custom widget is provided but no formData exists, auto-select first option
      // This ensures the field always renders even when form is initially empty
      onOptionChange(0);
    }
  }, [autoDetectedOptionIndex, onOptionChange, selectedOption, hasCustomWidget, formData, options]);

  // Determine if we should hide the selector
  // Hide selector if:
  // 1. Custom widget is provided, OR
  // 2. We can auto-detect the matching option from form data (prevents showing selector when type is clear)
  const shouldHideSelector = hasCustomWidget || autoDetectedOptionIndex !== null;

  // Get label from uiSchema or schema title
  const fieldLabel = uiSchema?.['ui:title'] || schema.title || '';

  // Render the selector (for choosing between anyOf/oneOf options) and the selected option field
  // The optionSchemaField already contains the widget component from uiSchema, so we just need to render it
  // This ensures that widget components passed directly in uiSchema are properly rendered
  // If a custom widget is provided or we can auto-detect, hide the selector to avoid duplication
  // For custom widgets, we render the label here to ensure it appears only once
  // IMPORTANT: Only render optionSchemaField once - RJSF handles showing the correct option based on selection
  return (
    <div className="rjsf-multi-schema-field">
      {selector && !shouldHideSelector && (
        <div className="rjsf-multi-schema-selector" style={{ marginBottom: '12px' }}>
          {selector}
        </div>
      )}
      {optionSchemaField && (
        <div className="rjsf-multi-schema-option-field">
          {hasCustomWidget && fieldLabel ? (
            <BaseControl label={fieldLabel}>
              {optionSchemaField}
            </BaseControl>
          ) : (
            optionSchemaField
          )}
        </div>
      )}
    </div>
  );
};

export default MultiSchemaFieldTemplate;

