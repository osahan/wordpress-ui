import React from 'react';
import { Button } from '@wordpress/components';
import { TranslatableString, type IconButtonProps } from '@rjsf/utils';

const AddButton: React.FC<IconButtonProps> = ({ registry, uiSchema, ...props }) => {
    const { translateString } = registry;
    return (
        <Button
            title={translateString(TranslatableString.AddItemButton)}
            {...props}
            className={`rjsf-add-button ${props.className || ''}`}
            style={{ width: '100%', ...props.style }}
            variant="secondary"
        >
            + {translateString(TranslatableString.AddItemButton)}
        </Button>
    );
};

export default AddButton;
