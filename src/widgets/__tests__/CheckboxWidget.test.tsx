import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CheckboxWidget from '../CheckboxWidget';

describe('CheckboxWidget', () => {
  const defaultProps = {
    id: 'test-checkbox',
    value: false,
    onChange: jest.fn(),
    onBlur: jest.fn(),
    onFocus: jest.fn(),
    schema: { type: 'boolean', title: 'Test Checkbox' },
    uiSchema: {},
    options: {},
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<CheckboxWidget {...defaultProps} />);
    expect(screen.getByTestId('test-checkbox')).toBeInTheDocument();
  });

  it('displays label from schema title', () => {
    render(<CheckboxWidget {...defaultProps} />);
    expect(screen.getByLabelText('Test Checkbox')).toBeInTheDocument();
  });

  it('is unchecked by default', () => {
    render(<CheckboxWidget {...defaultProps} />);
    const checkbox = screen.getByTestId('test-checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('is checked when value is true', () => {
    render(<CheckboxWidget {...defaultProps} value={true} />);
    const checkbox = screen.getByTestId('test-checkbox');
    expect(checkbox).toBeChecked();
  });

  it('calls onChange when checkbox is clicked', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<CheckboxWidget {...defaultProps} onChange={handleChange} />);
    const checkbox = screen.getByTestId('test-checkbox');

    await user.click(checkbox);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('calls onChange with false when unchecked checkbox is clicked', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(
      <CheckboxWidget {...defaultProps} value={true} onChange={handleChange} />
    );
    const checkbox = screen.getByTestId('test-checkbox');

    await user.click(checkbox);
    expect(handleChange).toHaveBeenCalledWith(false);
  });

  it('calls onBlur when checkbox loses focus', async () => {
    const user = userEvent.setup();
    const handleBlur = jest.fn();
    render(<CheckboxWidget {...defaultProps} onBlur={handleBlur} />);
    const checkbox = screen.getByTestId('test-checkbox');

    await user.click(checkbox);
    await user.tab();
    expect(handleBlur).toHaveBeenCalledWith('test-checkbox', false);
  });

  it('displays required indicator when required', () => {
    render(<CheckboxWidget {...defaultProps} required />);
    expect(screen.getByLabelText(/Test Checkbox \*/)).toBeInTheDocument();
  });

  it('displays help text from schema description', () => {
    render(
      <CheckboxWidget
        {...defaultProps}
        schema={{ type: 'boolean', title: 'Test', description: 'Help text' }}
      />
    );
    expect(screen.getByText('Help text')).toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    render(<CheckboxWidget {...defaultProps} disabled />);
    const checkbox = screen.getByTestId('test-checkbox');
    expect(checkbox).toBeDisabled();
  });

  it('applies error class when there are errors', () => {
    render(
      <CheckboxWidget {...defaultProps} rawErrors={['Error message']} />
    );
    const control = screen.getByTestId('test-checkbox').closest('.checkbox-control');
    expect(control).toHaveClass('has-error');
  });
});

