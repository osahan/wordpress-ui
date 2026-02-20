import React from 'react';
import {
    buttonId,
    TranslatableString,
    ADDITIONAL_PROPERTY_FLAG,
    type WrapIfAdditionalTemplateProps,
} from '@rjsf/utils';

/** The `WrapIfAdditional` component is used by the `FieldTemplate` to rename, or remove properties that are
 * part of an `additionalProperties` part of a schema.
 *
 * @param props - The `WrapIfAdditionalProps` for this component
 */
const WrapIfAdditionalTemplate: React.FC<WrapIfAdditionalTemplateProps> = ({
    children,
    classNames,
    disabled,
    id,
    label,
    onRemoveProperty,
    readonly,
    registry,
    schema,
    uiSchema,
}) => {
    const isAdditional = schema.hasOwnProperty(ADDITIONAL_PROPERTY_FLAG);

    if (!isAdditional) {
        return <>{children}</>;
    }

    const { templates, translateString } = registry;
    const { RemoveButton } = templates.ButtonTemplates;

    return (
        <div className={classNames} key={`${id}-${label}`}>
            <div className="rjsf-additional-property">
                <div className="rjsf-additional-property-actions">
                    <RemoveButton
                        className="rjsf-object-property-remove"
                        disabled={disabled || readonly}
                        iconType="default"
                        id={buttonId(id, 'remove')}
                        onClick={onRemoveProperty}
                        registry={registry}
                        uiSchema={uiSchema}
                    />
                </div>
                <div className="rjsf-additional-property-content">{children}</div>
            </div>
        </div>
    );
};

export default WrapIfAdditionalTemplate;
