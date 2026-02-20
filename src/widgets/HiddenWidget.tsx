import React from 'react';
import type { WidgetProps } from '@rjsf/utils';

const HiddenWidget: React.FC<WidgetProps> = ({ id, value }) => {
    // Hidden widget doesn't render anything visible
    // Just render a hidden input with the value - no need to call onChange
    return <input id={id} readOnly type="hidden" value={value || ''} />;
};

export default HiddenWidget;
