import React from 'react';
import type { WidgetProps } from '@rjsf/core';

const HiddenWidget: React.FC<WidgetProps> = ({ id, value, onChange }) => {
  // Hidden widget doesn't render anything visible
  // But we need to ensure the value is set
  React.useEffect(() => {
    if (value === undefined) {
      onChange('');
    }
  }, [value, onChange]);

  return <input type="hidden" id={id} value={value || ''} />;
};

export default HiddenWidget;

