import React from 'react';
import { Notice } from '@wordpress/components';
import type { ErrorListProps } from '@rjsf/utils';

const ErrorListTemplate: React.FC<ErrorListProps> = ({ errors }) => {
    if (!errors || errors.length === 0) {
        return null;
    }

    return (
        <div className="rjsf-error-list">
            <Notice isDismissible={false} status="error">
                <strong>Please correct the following errors:</strong>
                <ul className="rjsf-error-list-items">
                    {errors.map((error, index) => (
                        <li className="rjsf-error-list-item" key={index}>
                            {typeof error === 'string' ? error : error.stack || String(error)}
                        </li>
                    ))}
                </ul>
            </Notice>
        </div>
    );
};

export default ErrorListTemplate;
