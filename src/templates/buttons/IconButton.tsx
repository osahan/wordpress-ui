import React from 'react';
import { Button } from '@wordpress/components';
import { IconButtonProps } from '@rjsf/utils';

interface WordPressIconButtonProps extends IconButtonProps {
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'link';
  isDestructive?: boolean;
}

const IconButton: React.FC<WordPressIconButtonProps> = ({
  icon,
  className,
  variant = 'secondary',
  isDestructive = false,
  ...otherProps
}) => {
  return (
    <Button
      {...otherProps}
      variant={variant}
      isDestructive={isDestructive}
      className={className}
      size="small"
    >
      {icon}
    </Button>
  );
};

export default IconButton;

export function CopyButton(props: WordPressIconButtonProps) {
  const {
    registry: { translateString },
  } = props;
  return (
    <IconButton
      title={translateString('Copy')}
      {...props}
      icon="📋"
    />
  );
}

export function MoveDownButton(props: WordPressIconButtonProps) {
  const {
    registry: { translateString },
  } = props;
  return (
    <IconButton
      title={translateString('Move Down')}
      {...props}
      icon="↓"
    />
  );
}

export function MoveUpButton(props: WordPressIconButtonProps) {
  const {
    registry: { translateString },
  } = props;
  return (
    <IconButton
      title={translateString('Move Up')}
      {...props}
      icon="↑"
    />
  );
}

export function RemoveButton(props: WordPressIconButtonProps) {
  const {
    registry: { translateString },
  } = props;
  return (
    <IconButton
      title={translateString('Remove')}
      variant="secondary"
      isDestructive
      {...props}
      icon="✕"
    />
  );
}

