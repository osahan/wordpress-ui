import React from 'react';
import { Button } from '@wordpress/components';
import type { OptionalDataControlsTemplateProps } from '@rjsf/utils';

const OptionalDataControlsTemplate: React.FC<OptionalDataControlsTemplateProps> = ({ onAddClick }) => {
    return (
        <div className="rjsf-optional-data-controls">
            <Button className="rjsf-add-optional-data-button" onClick={onAddClick} variant="secondary">
                Add Additional Data
            </Button>
        </div>
    );
};

export default OptionalDataControlsTemplate;
