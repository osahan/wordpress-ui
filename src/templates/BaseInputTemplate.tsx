import React, { ChangeEvent, FocusEvent } from 'react';
import { TextControl } from '@wordpress/components';
import {
  ariaDescribedByIds,
  BaseInputTemplateProps,
  examplesId,
  getInputProps,
} from '@rjsf/utils';

const BaseInputTemplate: React.FC<BaseInputTemplateProps> = ({
  id,
  htmlName,
  placeholder,
  required,
  readonly,
  disabled,
  type,
  value,
  onChange,
  onChangeOverride,
  onBlur,
  onFocus,
  autofocus,
  options,
  schema,
  rawErrors = [],
  children,
  extraProps,
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
          id={id}
          name={htmlName || id}
          type="file"
          placeholder={placeholder}
          autoFocus={autofocus}
          required={required}
          disabled={disabled}
          readOnly={readonly}
          className={rawErrors.length > 0 ? 'has-error' : ''}
          {...inputProps}
          onChange={(e) => {
            const files = e.target.files;
            if (files && files.length > 0) {
              onChange(files[0].name);
            } else {
              onChange(options.emptyValue);
            }
          }}
          onBlur={_onBlur}
          onFocus={_onFocus}
          aria-describedby={ariaDescribedByIds(id, !!schema.examples)}
        />
        {children}
        {Array.isArray(schema.examples) && (
          <datalist id={examplesId(id)}>
            {(schema.examples as string[])
              .concat(
                schema.default && !schema.examples.includes(schema.default)
                  ? ([schema.default] as string[])
                  : []
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
        id={id}
        type={type || 'text'}
        value={value || value === 0 ? String(value) : ''}
        placeholder={placeholder}
        autoFocus={autofocus}
        required={required}
        disabled={disabled || readonly}
        onChange={_onChange}
        onBlur={_onBlur}
        onFocus={_onFocus}
        className={rawErrors.length > 0 ? 'has-error' : ''}
        aria-describedby={ariaDescribedByIds(id, !!schema.examples)}
        {...(inputProps as any)}
      />
      {children}
      {Array.isArray(schema.examples) && (
        <datalist id={examplesId(id)}>
          {(schema.examples as string[])
            .concat(
              schema.default && !schema.examples.includes(schema.default)
                ? ([schema.default] as string[])
                : []
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

