import React from 'react';
import { create } from '@wordpress/icons';
import { Button } from '@wordpress/components';
import { TranslatableString } from '@rjsf/utils';

import type { WordPressIconButtonProps } from './IconButton';

const AddButton: React.FC<WordPressIconButtonProps> = ({
    className,
    registry,
    style,
    title,
    uiSchema,
    ...props
}) => {
    const { translateString } = registry;
    const text = translateString(TranslatableString.AddItemButton);
    return (
        <Button
            className={`rjsf-add-button ${className || ''}`}
            icon={create}
            style={{ width: '100%', ...style }}
            text={text}
            title={title? title : text}
            variant="secondary"
            {...props}
        ></Button>
    );
};

export default AddButton;
