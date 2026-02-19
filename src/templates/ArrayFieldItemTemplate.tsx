import React, { type CSSProperties } from 'react';
import { getTemplate, getUiOptions, type ArrayFieldItemTemplateProps } from '@rjsf/utils';

const ArrayFieldItemTemplate: React.FC<ArrayFieldItemTemplateProps> = (props) => {
    const { buttonsProps, children, displayLabel, hasDescription, hasToolbar, registry, uiSchema } = props;
    const uiOptions = getUiOptions(uiSchema);
    const ArrayFieldItemButtonsTemplate = getTemplate<'ArrayFieldItemButtonsTemplate'>(
        'ArrayFieldItemButtonsTemplate',
        registry,
        uiOptions,
    );

    const btnStyle: CSSProperties = {
        flex: 1,
        fontWeight: 'bold',
        paddingLeft: 6,
        paddingRight: 6,
    };

    return (
        <div className="rjsf-array-field-item-template">
            <div className="rjsf-array-field-item-content">{children}</div>
            {hasToolbar && (
                <div className="rjsf-array-field-item-toolbar">
                    <ArrayFieldItemButtonsTemplate {...buttonsProps} style={btnStyle} />
                </div>
            )}
        </div>
    );
};

export default ArrayFieldItemTemplate;
