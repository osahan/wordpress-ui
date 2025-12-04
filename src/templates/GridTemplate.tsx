import React from 'react';
import { GridTemplateProps } from '@rjsf/utils';

const GridTemplate: React.FC<GridTemplateProps> = ({ children, column, ...rest }) => {
  if (column) {
    return (
      <div className={`rjsf-grid-column ${rest.className || ''}`} {...rest}>
        {children}
      </div>
    );
  }
  return (
    <div className={`rjsf-grid-row ${rest.className || ''}`} {...rest}>
      {children}
    </div>
  );
};

export default GridTemplate;

