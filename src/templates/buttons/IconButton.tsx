import React from 'react';
import { Button } from '@wordpress/components';
import type { IconButtonProps } from '@rjsf/utils';

interface WordPressIconButtonProps extends Omit<IconButtonProps, 'icon'> {
    icon?: React.ReactNode;
    isDestructive?: boolean;
    variant?: 'link' | 'primary' | 'secondary' | 'tertiary';
}

const IconButton: React.FC<WordPressIconButtonProps> = ({
    className,
    icon,
    isDestructive = false,
    variant = 'secondary',
    ...otherProps
}) => {
    return (
        <Button
            {...(otherProps as any)}
            className={className}
            isDestructive={isDestructive}
            variant={variant}
        >
            {icon}
        </Button>
    );
};

export default IconButton;

export const CopyButton = (props: WordPressIconButtonProps) => {
    const {
        registry: { translateString },
    } = props;
    return (
        <IconButton title={translateString ? translateString('Copy' as any) : 'Copy'} {...props} icon="📋" />
    );
};

export const MoveDownButton = (props: WordPressIconButtonProps) => {
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
};

export const MoveUpButton = (props: WordPressIconButtonProps) => {
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
};

export const RemoveButton = (props: WordPressIconButtonProps) => {
    const {
        registry: { translateString },
    } = props;
    return (
        <IconButton
            isDestructive
            title={translateString ? translateString('Remove' as any) : 'Remove'}
            variant="secondary"
            {...props}
            icon="✕"
        />
    );
};
