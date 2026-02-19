import React from 'react';
import { Button } from '@wordpress/components';

interface WrapIfAdditionalTemplateProps {
    children: React.ReactNode;
    classNames?: string;
    disabled?: boolean;
    id: string;
    label: string;
    onDropPropertyClick: (label: string) => () => void;
    onKeyDrop?: (key: string) => void;
    readonly?: boolean;
    required?: boolean;
    schema: any;
}

const WrapIfAdditionalTemplate: React.FC<WrapIfAdditionalTemplateProps> = ({
    children,
    classNames,
    disabled,
    id,
    label,
    onDropPropertyClick,
    onKeyDrop,
    readonly,
    required,
    schema,
}) => {
    const isAdditional = schema.hasOwnProperty('__additional_property');

    if (!isAdditional) {
        return <>{children}</>;
    }

    return (
        <div className={classNames} key={`${id}-${label}`}>
            <div className="rjsf-additional-property">
                <div className="rjsf-additional-property-content">{children}</div>
                <div className="rjsf-additional-property-actions">
                    <Button
                        className="rjsf-additional-property-remove"
                        disabled={disabled || readonly}
                        isDestructive
                        onClick={onDropPropertyClick(label)}
                        variant="secondary"
                    >
                        Remove
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default WrapIfAdditionalTemplate;
