import React from 'react';
import { Notice } from '@wordpress/components';
import { errorId, type FieldErrorProps } from '@rjsf/utils';

const FieldErrorTemplate: React.FC<FieldErrorProps> = ({ errors = [], fieldPathId }) => {
    if (errors.length === 0) {
        return null;
    }

    const id = errorId(fieldPathId);

    return (
        <div className="rjsf-field-error" id={id}>
            {errors.map((error, i) => (
                <Notice isDismissible={false} key={i} status="error">
                    {error}
                </Notice>
            ))}
        </div>
    );
};

export default FieldErrorTemplate;
