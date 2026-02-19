import React from 'react';
import type { FieldProps } from '@rjsf/utils';

const DescriptionField: React.FC<FieldProps> = ({ description, id }) => {
    if (!description) {
        return null;
    }

    return (
        <p className="rjsf-description-field components-base-control__help" id={id}>
            {description}
        </p>
    );
};

export default DescriptionField;
