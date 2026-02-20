import React from 'react';
import type { FieldProps } from '@rjsf/utils';

const TitleField: React.FC<FieldProps> = ({ id, title }) => {
    if (!title) {
        return null;
    }

    return (
        <h2 className="rjsf-title-field" id={id}>
            {title}
        </h2>
    );
};

export default TitleField;
