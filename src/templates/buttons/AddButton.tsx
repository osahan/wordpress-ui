import React from 'react';
import { Button } from '@wordpress/components';
import { IconButtonProps, TranslatableString } from '@rjsf/utils';

const AddButton: React.FC<IconButtonProps> = ({ uiSchema, registry, ...props }) => {
  const { translateString } = registry;
  return (
    <Button
      title={translateString(TranslatableString.AddItemButton)}
      {...props}
      variant="secondary"
      className={`rjsf-add-button ${props.className || ''}`}
      style={{ width: '100%', ...props.style }}
    >
      + {translateString(TranslatableString.AddItemButton)}
    </Button>
  );
};

export default AddButton;

