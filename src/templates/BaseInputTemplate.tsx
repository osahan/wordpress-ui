import React from 'react';
import { TextControl } from '@wordpress/components';
import { examplesId, getInputProps, ariaDescribedByIds, type BaseInputTemplateProps } from '@rjsf/utils';

const BaseInputTemplate: React.FC<BaseInputTemplateProps> = ({
    autofocus,
    children,
    disabled,
    extraProps,
    htmlName,
    id,
    onBlur,
    onChange,
    onChangeOverride,
    onFocus,
    options,
    placeholder,
    rawErrors = [],
    readonly,
    required,
    schema,
    type,
    value,
}) => {
    const inputProps = {
        ...extraProps,
        ...getInputProps(schema, type, options),
    };

    const _onChange = (val: string) => {
        const handler = onChangeOverride || onChange;
        handler(val === '' ? options.emptyValue : val);
    };

    const _onBlur = () => {
        onBlur(id, value);
    };

    const _onFocus = () => {
        onFocus(id, value);
    };

    // For file type, we can't use TextControl
    if (type === 'file') {
        return (
            <>
                <input
                    autoFocus={autofocus}
                    className={rawErrors.length > 0 ? 'has-error' : ''}
                    disabled={disabled}
                    id={id}
                    name={htmlName || id}
                    placeholder={placeholder}
                    readOnly={readonly}
                    required={required}
                    type="file"
                    {...inputProps}
                    aria-describedby={ariaDescribedByIds(id, !!schema.examples)}
                    onBlur={_onBlur}
                    onChange={(e) => {
                        const files = e.target.files;
                        if (files && files.length > 0) {
                            onChange(files[0].name);
                        } else {
                            onChange(options.emptyValue);
                        }
                    }}
                    onFocus={_onFocus}
                />
                {children}
                {Array.isArray(schema.examples) && (
                    <datalist id={examplesId(id)}>
                        {(schema.examples as string[])
                            .concat(
                                schema.default && !schema.examples.includes(schema.default)
                                    ? ([schema.default] as string[])
                                    : [],
                            )
                            .map((example: any) => (
                                <option key={example} value={example} />
                            ))}
                    </datalist>
                )}
            </>
        );
    }

    return (
        <>
            <TextControl
                aria-describedby={ariaDescribedByIds(id, !!schema.examples)}
                autoFocus={autofocus}
                className={rawErrors.length > 0 ? 'has-error' : ''}
                disabled={disabled || readonly}
                id={id}
                onBlur={_onBlur}
                onChange={_onChange}
                onFocus={_onFocus}
                placeholder={placeholder}
                required={required}
                type={type || 'text'}
                value={value || value === 0 ? String(value) : ''}
                {...(inputProps as any)}
            />
            {children}
            {Array.isArray(schema.examples) && (
                <datalist id={examplesId(id)}>
                    {(schema.examples as string[])
                        .concat(
                            schema.default && !schema.examples.includes(schema.default)
                                ? ([schema.default] as string[])
                                : [],
                        )
                        .map((example: any) => (
                            <option key={example} value={example} />
                        ))}
                </datalist>
            )}
        </>
    );
};

export default BaseInputTemplate;
