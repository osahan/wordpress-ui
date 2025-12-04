import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextWidget from '../TextWidget';

describe('TextWidget', () => {
  const defaultProps = {
    id: 'test-text',
    value: '',
    onChange: jest.fn(),
    onBlur: jest.fn(),
    onFocus: jest.fn(),
    schema: { type: 'string', title: 'Test Field' },
    uiSchema: {},
    options: {},
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<TextWidget {...defaultProps} />);
    expect(screen.getByTestId('test-text')).toBeInTheDocument();
  });

  it('displays label from schema title', () => {
    render(<TextWidget {...defaultProps} />);
    expect(screen.getByLabelText('Test Field')).toBeInTheDocument();
  });

  it('displays label from label prop', () => {
    render(<TextWidget {...defaultProps} label="Custom Label" />);
    expect(screen.getByLabelText('Custom Label')).toBeInTheDocument();
  });

  it('displays label from uiSchema', () => {
    render(
      <TextWidget
        {...defaultProps}
        uiSchema={{ 'ui:title': 'UI Schema Label' }}
      />
    );
    expect(screen.getByLabelText('UI Schema Label')).toBeInTheDocument();
  });

  it('displays current value', () => {
    render(<TextWidget {...defaultProps} value="test value" />);
    const input = screen.getByTestId('test-text');
    expect(input).toHaveValue('test value');
  });

  it('calls onChange when value changes', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<TextWidget {...defaultProps} onChange={handleChange} />);
    const input = screen.getByTestId('test-text');

    await user.type(input, 'new value');
    expect(handleChange).toHaveBeenCalled();
  });

  it('calls onBlur when input loses focus', async () => {
    const user = userEvent.setup();
    const handleBlur = jest.fn();
    render(<TextWidget {...defaultProps} onBlur={handleBlur} />);
    const input = screen.getByTestId('test-text');

    await user.click(input);
    await user.tab();
    expect(handleBlur).toHaveBeenCalledWith('test-text', '');
  });

  it('calls onFocus when input gains focus', async () => {
    const user = userEvent.setup();
    const handleFocus = jest.fn();
    render(<TextWidget {...defaultProps} onFocus={handleFocus} />);
    const input = screen.getByTestId('test-text');

    await user.click(input);
    expect(handleFocus).toHaveBeenCalledWith('test-text', '');
  });

  it('displays required indicator when required', () => {
    render(<TextWidget {...defaultProps} required />);
    expect(screen.getByLabelText(/Test Field \*/)).toBeInTheDocument();
  });

  it('displays help text from schema description', () => {
    render(
      <TextWidget
        {...defaultProps}
        schema={{ type: 'string', title: 'Test', description: 'Help text' }}
      />
    );
    expect(screen.getByText('Help text')).toBeInTheDocument();
  });

  it('displays help text from uiSchema', () => {
    render(
      <TextWidget
        {...defaultProps}
        uiSchema={{ 'ui:help': 'UI help text' }}
      />
    );
    expect(screen.getByText('UI help text')).toBeInTheDocument();
  });

  it('displays help text from options', () => {
    render(
      <TextWidget {...defaultProps} options={{ help: 'Options help' }} />
    );
    expect(screen.getByText('Options help')).toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    render(<TextWidget {...defaultProps} disabled />);
    const input = screen.getByTestId('test-text');
    expect(input).toBeDisabled();
  });

  it('is disabled when readonly prop is true', () => {
    render(<TextWidget {...defaultProps} readonly />);
    const input = screen.getByTestId('test-text');
    expect(input).toBeDisabled();
  });

  it('applies error class when there are errors', () => {
    render(<TextWidget {...defaultProps} rawErrors={['Error message']} />);
    const control = screen.getByTestId('test-text').closest('.text-control');
    expect(control).toHaveClass('has-error');
  });

  it('handles empty value correctly', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(
      <TextWidget
        {...defaultProps}
        value="initial"
        onChange={handleChange}
        options={{ emptyValue: '' }}
      />
    );
    const input = screen.getByTestId('test-text');

    await user.clear(input);
    expect(handleChange).toHaveBeenCalledWith('');
  });
});

