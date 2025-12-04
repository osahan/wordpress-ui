import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextareaWidget from '../TextareaWidget';

describe('TextareaWidget', () => {
  const defaultProps = {
    id: 'test-textarea',
    value: '',
    onChange: jest.fn(),
    onBlur: jest.fn(),
    onFocus: jest.fn(),
    schema: { type: 'string', title: 'Test Textarea' },
    uiSchema: {},
    options: {},
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<TextareaWidget {...defaultProps} />);
    expect(screen.getByTestId('test-textarea')).toBeInTheDocument();
  });

  it('displays label from schema title', () => {
    render(<TextareaWidget {...defaultProps} />);
    expect(screen.getByLabelText('Test Textarea')).toBeInTheDocument();
  });

  it('displays current value', () => {
    render(<TextareaWidget {...defaultProps} value="test content" />);
    const textarea = screen.getByTestId('test-textarea');
    expect(textarea).toHaveValue('test content');
  });

  it('calls onChange when value changes', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<TextareaWidget {...defaultProps} onChange={handleChange} />);
    const textarea = screen.getByTestId('test-textarea');

    await user.type(textarea, 'new content');
    expect(handleChange).toHaveBeenCalled();
  });

  it('calls onBlur when textarea loses focus', async () => {
    const user = userEvent.setup();
    const handleBlur = jest.fn();
    render(<TextareaWidget {...defaultProps} onBlur={handleBlur} />);
    const textarea = screen.getByTestId('test-textarea');

    await user.click(textarea);
    await user.tab();
    expect(handleBlur).toHaveBeenCalledWith('test-textarea', '');
  });

  it('displays required indicator when required', () => {
    render(<TextareaWidget {...defaultProps} required />);
    expect(screen.getByLabelText(/Test Textarea \*/)).toBeInTheDocument();
  });

  it('displays help text from schema description', () => {
    render(
      <TextareaWidget
        {...defaultProps}
        schema={{ type: 'string', title: 'Test', description: 'Help text' }}
      />
    );
    expect(screen.getByText('Help text')).toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    render(<TextareaWidget {...defaultProps} disabled />);
    const textarea = screen.getByTestId('test-textarea');
    expect(textarea).toBeDisabled();
  });

  it('applies error class when there are errors', () => {
    render(
      <TextareaWidget {...defaultProps} rawErrors={['Error message']} />
    );
    const control = screen.getByTestId('test-textarea').closest('.textarea-control');
    expect(control).toHaveClass('has-error');
  });
});

