import React from 'react';
import { helpId, type FieldHelpProps } from '@rjsf/utils';

const FieldHelpTemplate: React.FC<FieldHelpProps> = ({
    fieldPathId,
    hasErrors,
    help,
    registry,
    uiSchema,
}) => {
    if (!help) {
        return null;
    }

    // Render help text directly - RichHelp may not be available in all versions
    // help can be a string or a React element
    return (
        <div
            className={`components-base-control__help ${hasErrors ? 'components-base-control__help--error' : ''}`}
            id={helpId(fieldPathId)}
        >
            {help}
        </div>
    );
};

export default FieldHelpTemplate;
