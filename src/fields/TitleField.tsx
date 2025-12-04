import React from 'react';
import type { FieldProps } from '@rjsf/utils';

const TitleField: React.FC<FieldProps> = ({ title, id }) => {
  if (!title) {
    return null;
  }

  return (
    <h2 id={id} className="rjsf-title-field">
      {title}
    </h2>
  );
};

export default TitleField;

