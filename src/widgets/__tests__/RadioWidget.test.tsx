import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RadioWidget from '../RadioWidget';

describe('RadioWidget', () => {
  const defaultProps = {
    id: 'test-radio',
    value: '',
    onChange: jest.fn(),
    onBlur: jest.fn(),
    onFocus: jest.fn(),
    schema: { type: 'string', title: 'Test Radio' },
    uiSchema: {},
    options: {
      enumOptions: [
        { label: 'Option 1', value: 'opt1' },
        { label: 'Option 2', value: 'opt2' },
        { label: 'Option 3', value: 'opt3' },
      ],
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<RadioWidget {...defaultProps} />);
    expect(screen.getByTestId('test-radio-opt1')).toBeInTheDocument();
  });

  it('displays label from schema title', () => {
    render(<RadioWidget {...defaultProps} />);
    expect(screen.getByText('Test Radio')).toBeInTheDocument();
  });

  it('renders all radio options', () => {
    render(<RadioWidget {...defaultProps} />);
    expect(screen.getByTestId('test-radio-opt1')).toBeInTheDocument();
    expect(screen.getByTestId('test-radio-opt2')).toBeInTheDocument();
    expect(screen.getByTestId('test-radio-opt3')).toBeInTheDocument();
  });

  it('displays selected value', () => {
    render(<RadioWidget {...defaultProps} value="opt2" />);
    const radio2 = screen.getByTestId('test-radio-opt2');
    expect(radio2).toBeChecked();
  });

  it('calls onChange when option is selected', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<RadioWidget {...defaultProps} onChange={handleChange} />);
    const radio2 = screen.getByTestId('test-radio-opt2');

    await user.click(radio2);
    expect(handleChange).toHaveBeenCalledWith('opt2');
  });

  it('calls onBlur when radio loses focus', async () => {
    const user = userEvent.setup();
    const handleBlur = jest.fn();
    render(<RadioWidget {...defaultProps} onBlur={handleBlur} />);
    const radio1 = screen.getByTestId('test-radio-opt1');

    await user.click(radio1);
    await user.tab();
    expect(handleBlur).toHaveBeenCalledWith('test-radio', '');
  });

  it('displays required indicator when required', () => {
    render(<RadioWidget {...defaultProps} required />);
    expect(screen.getByText(/Test Radio \*/)).toBeInTheDocument();
  });

  it('displays help text from schema description', () => {
    render(
      <RadioWidget
        {...defaultProps}
        schema={{ type: 'string', title: 'Test', description: 'Help text' }}
      />
    );
    expect(screen.getByText('Help text')).toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    render(<RadioWidget {...defaultProps} disabled />);
    const radio1 = screen.getByTestId('test-radio-opt1');
    expect(radio1).toBeDisabled();
  });

  it('handles numeric enum values', () => {
    render(
      <RadioWidget
        {...defaultProps}
        options={{
          enumOptions: [
            { label: 'One', value: 1 },
            { label: 'Two', value: 2 },
          ],
        }}
        value={1}
      />
    );
    const radio1 = screen.getByTestId('test-radio-1');
    expect(radio1).toBeChecked();
  });

  it('applies error class when there are errors', () => {
    render(<RadioWidget {...defaultProps} rawErrors={['Error message']} />);
    const control = screen.getByTestId('test-radio-opt1').closest('.radio-control');
    expect(control).toHaveClass('has-error');
  });
});

