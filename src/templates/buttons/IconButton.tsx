import React from 'react';
import { Button } from '@wordpress/components';
import type { IconButtonProps } from '@rjsf/utils';

interface WordPressIconButtonProps extends Omit<IconButtonProps, 'icon'> {
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
      {...(otherProps as any)}
      variant={variant}
      isDestructive={isDestructive}
      className={className}
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
      title={translateString ? translateString('Copy' as any) : 'Copy'}
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
      title={translateString ? translateString('Move Down' as any) : 'Move Down'}
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
      title={translateString ? translateString('Move Up' as any) : 'Move Up'}
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
      title={translateString ? translateString('Remove' as any) : 'Remove'}
      variant="secondary"
      isDestructive
      {...props}
      icon="✕"
    />
  );
}

