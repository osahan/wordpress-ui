import React from 'react';
import { FieldHelpProps, helpId } from '@rjsf/utils';

const FieldHelpTemplate: React.FC<FieldHelpProps> = ({
  fieldPathId,
  help,
  uiSchema,
  registry,
  hasErrors,
}) => {
  if (!help) {
    return null;
  }

  // Render help text directly - RichHelp may not be available in all versions
  // help can be a string or a React element
  return (
    <div
      id={helpId(fieldPathId)}
      className={`components-base-control__help ${hasErrors ? 'components-base-control__help--error' : ''}`}
    >
      {help}
    </div>
  );
};

export default FieldHelpTemplate;

