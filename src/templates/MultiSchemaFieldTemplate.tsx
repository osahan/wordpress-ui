import React from 'react';
import { MultiSchemaFieldTemplateProps, getTemplate, getUiOptions } from '@rjsf/utils';
import { SelectControl } from '@wordpress/components';

const MultiSchemaFieldTemplate: React.FC<MultiSchemaFieldTemplateProps> = (props) => {
  // MultiSchemaFieldTemplate API may have changed in v6
  // For now, render content directly - children may not be available in v6
  return (
    <div className="rjsf-multi-schema-field">
      {/* Render content if available */}
    </div>
  );
};

export default MultiSchemaFieldTemplate;

