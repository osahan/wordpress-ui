import React from 'react';
import { Notice } from '@wordpress/components';
import { FieldErrorProps, errorId } from '@rjsf/utils';

const FieldErrorTemplate: React.FC<FieldErrorProps> = ({ errors = [], fieldPathId }) => {
  if (errors.length === 0) {
    return null;
  }

  const id = errorId(fieldPathId);

  return (
    <div id={id} className="rjsf-field-error">
      {errors.map((error, i) => (
        <Notice key={i} status="error" isDismissible={false}>
          {error}
        </Notice>
      ))}
    </div>
  );
};

export default FieldErrorTemplate;

