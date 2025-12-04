import React from 'react';
import { Button } from '@wordpress/components';
import { OptionalDataControlsTemplateProps } from '@rjsf/utils';

const OptionalDataControlsTemplate: React.FC<OptionalDataControlsTemplateProps> = ({
  onAddClick,
}) => {
  return (
    <div className="rjsf-optional-data-controls">
      <Button
        variant="secondary"
        onClick={onAddClick}
        className="rjsf-add-optional-data-button"
      >
        Add Additional Data
      </Button>
    </div>
  );
};

export default OptionalDataControlsTemplate;

