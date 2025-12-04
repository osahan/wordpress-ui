import React, { CSSProperties } from 'react';
import { Button } from '@wordpress/components';
import {
  ArrayFieldItemTemplateProps,
  getTemplate,
  getUiOptions,
} from '@rjsf/utils';

const ArrayFieldItemTemplate: React.FC<ArrayFieldItemTemplateProps> = (props) => {
  const { children, buttonsProps, displayLabel, hasDescription, hasToolbar, uiSchema, registry } = props;
  const uiOptions = getUiOptions(uiSchema);
  const ArrayFieldItemButtonsTemplate = getTemplate<'ArrayFieldItemButtonsTemplate'>(
    'ArrayFieldItemButtonsTemplate',
    registry,
    uiOptions,
  );

  const btnStyle: CSSProperties = {
    flex: 1,
    paddingLeft: 6,
    paddingRight: 6,
    fontWeight: 'bold',
  };

  return (
    <div className="rjsf-array-field-item-template">
      <div className="rjsf-array-field-item-content">
        {children}
      </div>
      {hasToolbar && (
        <div className="rjsf-array-field-item-toolbar">
          <ArrayFieldItemButtonsTemplate {...buttonsProps} style={btnStyle} />
        </div>
      )}
    </div>
  );
};

export default ArrayFieldItemTemplate;

