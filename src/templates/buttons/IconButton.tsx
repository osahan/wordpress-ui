import React from 'react';
import { Button } from '@wordpress/components';
import { TranslatableString, type IconButtonProps } from '@rjsf/utils';
import { copy, arrowUp, arrowDown, closeSmall } from '@wordpress/icons';

export interface WordPressIconButtonProps extends Omit<IconButtonProps, 'icon'> {
    icon?: React.ReactNode;
    isDestructive?: boolean;
    text?: string;
    variant?: 'link' | 'primary' | 'secondary' | 'tertiary';
}

const IconButton: React.FC<WordPressIconButtonProps> = ({
    className,
    icon,
    isDestructive = false,
    text,
    variant = 'secondary',
    ...otherProps
}) => {
    return (
        <Button
            {...(otherProps as any)}
            className={className}
            icon={icon}
            isDestructive={isDestructive}
            text={text}
            variant={variant}
        ></Button>
    );
};

export default IconButton;

export const CopyButton = ({ title, ...props }: WordPressIconButtonProps) => {
    const { translateString } = props.registry;
    const text = translateString(TranslatableString.CopyButton);
    return <IconButton icon={copy} title={title ?? text} {...props} />;
};

export const MoveDownButton = ({ title, ...props }: WordPressIconButtonProps) => {
    const { translateString } = props.registry;
    const text = translateString(TranslatableString.MoveDownButton);
    return <IconButton icon={arrowDown} title={title ?? text} {...props} />;
};

export const MoveUpButton = ({ title, ...props }: WordPressIconButtonProps) => {
    const { translateString } = props.registry;
    const text = translateString(TranslatableString.MoveUpButton);
    return <IconButton icon={arrowUp} title={title ?? text} {...props} />;
};

export const RemoveButton = ({ title, ...props }: WordPressIconButtonProps) => {
    const { translateString } = props.registry;
    const text = translateString(TranslatableString.RemoveButton);
    return <IconButton icon={closeSmall} isDestructive text={text} title={title ?? text} {...props} />;
};
