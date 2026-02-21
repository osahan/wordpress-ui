import React from 'react';
import { Button } from '@wordpress/components';
import { type SubmitButtonProps, getSubmitButtonOptions } from '@rjsf/utils';

const SubmitButton: React.FC<SubmitButtonProps> = (props) => {
    const { norender, props: submitButtonProps, submitText } = getSubmitButtonOptions(props.uiSchema);

    if (norender) {
        return null;
    }

    return (
        <div className="rjsf-submit-button-wrapper">
            <Button type="submit" text={submitText} variant="primary" {...submitButtonProps}>
            </Button>
        </div>
    );
};

export default SubmitButton;
