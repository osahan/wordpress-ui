import React from 'react';
import { Notice } from '@wordpress/components';
import type { ErrorListProps } from '@rjsf/core';

const ErrorListTemplate: React.FC<ErrorListProps> = ({ errors }) => {
  if (!errors || errors.length === 0) {
    return null;
  }

  return (
    <div className="rjsf-error-list">
      <Notice status="error" isDismissible={false}>
        <strong>Please correct the following errors:</strong>
        <ul className="rjsf-error-list-items">
          {errors.map((error, index) => (
            <li key={index} className="rjsf-error-list-item">
              {error.stack || error}
            </li>
          ))}
        </ul>
      </Notice>
    </div>
  );
};

export default ErrorListTemplate;

