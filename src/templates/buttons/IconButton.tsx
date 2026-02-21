import React from 'react';
import { Button } from '@wordpress/components';
import { TranslatableString, type IconButtonProps } from '@rjsf/utils';
import { copy, arrowUp, arrowDown, closeSmall } from '@wordpress/icons';

type WordpressButtonProps = React.ComponentProps<typeof Button>
export type WordPressIconButtonProps = Omit<IconButtonProps, 'icon'> & WordpressButtonProps

const IconButton: React.FC<WordPressIconButtonProps> = ({
    isDestructive = false,
    variant = 'secondary',
    ...otherProps
}) => {
    return (
        <Button
            {...(otherProps as any)}
            isDestructive={isDestructive}
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

export const ClearButton = ({ title, ...props }: WordPressIconButtonProps) => {
    const { translateString } = props.registry;
    const text = translateString(TranslatableString.MoveDownButton);
    return <IconButton icon={arrowDown} isDestructive title={title ? title : text} {...props} />;
};
