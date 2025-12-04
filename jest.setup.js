require('@testing-library/jest-dom');
const React = require('react');

// Mock WordPress components
jest.mock('@wordpress/components', () => {
  const React = require('react');
  return {
    TextControl: ({ id, label, value, onChange, onBlur, onFocus, help, required, disabled, className }) =>
      React.createElement('div', { className: `text-control ${className || ''}` },
        label && React.createElement('label', { htmlFor: id }, label, required && ' *'),
        React.createElement('input', {
          id,
          type: 'text',
          value: value || '',
          onChange: (e) => onChange(e.target.value),
          onBlur,
          onFocus,
          disabled,
          'data-testid': id,
        }),
        help && React.createElement('div', { className: 'help-text' }, help)
      ),
    TextareaControl: ({ id, label, value, onChange, onBlur, onFocus, help, required, disabled, className }) =>
      React.createElement('div', { className: `textarea-control ${className || ''}` },
        label && React.createElement('label', { htmlFor: id }, label, required && ' *'),
        React.createElement('textarea', {
          id,
          value: value || '',
          onChange: (e) => onChange(e.target.value),
          onBlur,
          onFocus,
          disabled,
          'data-testid': id,
        }),
        help && React.createElement('div', { className: 'help-text' }, help)
      ),
    SelectControl: ({ id, label, value, options = [], onChange, onBlur, onFocus, help, required, disabled, className }) =>
      React.createElement('div', { className: `select-control ${className || ''}` },
        label && React.createElement('label', { htmlFor: id }, label, required && ' *'),
        React.createElement('select', {
          id,
          value: value || '',
          onChange: (e) => onChange(e.target.value),
          onBlur,
          onFocus,
          disabled,
          'data-testid': id,
        },
          options.map((option) =>
            React.createElement('option', { key: option.value, value: option.value }, option.label)
          )
        ),
        help && React.createElement('div', { className: 'help-text' }, help)
      ),
    CheckboxControl: ({ id, label, checked, onChange, onBlur, onFocus, help, required, disabled, className }) =>
      React.createElement('div', { className: `checkbox-control ${className || ''}` },
        React.createElement('label', {},
          React.createElement('input', {
            id,
            type: 'checkbox',
            checked: checked || false,
            onChange: (e) => onChange(e.target.checked),
            onBlur,
            onFocus,
            disabled,
            'data-testid': id,
          }),
          label,
          required && ' *'
        ),
        help && React.createElement('div', { className: 'help-text' }, help)
      ),
    RadioControl: ({ id, label, selected, options = [], onChange, onBlur, onFocus, help, required, disabled, className }) =>
      React.createElement('div', { className: `radio-control ${className || ''}` },
        label && React.createElement('div', { className: 'radio-label' }, label, required && ' *'),
        options.map((option) =>
          React.createElement('label', { key: option.value },
            React.createElement('input', {
              type: 'radio',
              name: id,
              value: option.value,
              checked: selected === option.value,
              onChange: (e) => onChange(e.target.value),
              onBlur,
              onFocus,
              disabled,
              'data-testid': `${id}-${option.value}`,
            }),
            option.label
          )
        ),
        help && React.createElement('div', { className: 'help-text' }, help)
      ),
    BaseControl: ({ id, label, help, children, className }) =>
      React.createElement('div', { className: `base-control ${className || ''}` },
        label && React.createElement('label', { htmlFor: id }, label),
        children,
        help && React.createElement('div', { className: 'help-text' }, help)
      ),
    Panel: ({ children, className }) =>
      React.createElement('div', { className: `panel ${className || ''}` }, children),
    PanelBody: ({ title, children, initialOpen }) =>
      React.createElement('div', { className: `panel-body ${initialOpen ? 'open' : ''}` },
        title && React.createElement('div', { className: 'panel-title' }, title),
        children
      ),
    Button: ({ children, onClick, disabled, variant, isDestructive, className }) =>
      React.createElement('button', {
        onClick,
        disabled,
        className: `button button-${variant || 'primary'} ${isDestructive ? 'is-destructive' : ''} ${className || ''}`,
      }, children),
    Notice: ({ status, children, isDismissible }) =>
      React.createElement('div', {
        className: `notice notice-${status} ${isDismissible ? 'is-dismissible' : ''}`,
      }, children),
  };
});
