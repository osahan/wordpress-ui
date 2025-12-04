import React from 'react';
import type { FieldProps } from '@rjsf/core';

const DescriptionField: React.FC<FieldProps> = ({ description, id }) => {
  if (!description) {
    return null;
  }

  return (
    <p id={id} className="rjsf-description-field components-base-control__help">
      {description}
    </p>
  );
};

export default DescriptionField;

