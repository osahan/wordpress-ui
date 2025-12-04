import React from 'react';
import { Button } from '@wordpress/components';
import { getSubmitButtonOptions, SubmitButtonProps } from '@rjsf/utils';

const SubmitButton: React.FC<SubmitButtonProps> = (props) => {
  const { submitText, norender, props: submitButtonProps } = getSubmitButtonOptions(props.uiSchema);
  
  if (norender) {
    return null;
  }

  return (
    <div className="rjsf-submit-button-wrapper">
      <Button variant="primary" type="submit" {...submitButtonProps}>
        {submitText}
      </Button>
    </div>
  );
};

export default SubmitButton;

