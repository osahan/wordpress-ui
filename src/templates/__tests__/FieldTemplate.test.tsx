import React from 'react';
import { render, screen } from '@testing-library/react';
import FieldTemplate from '../FieldTemplate';

describe('FieldTemplate', () => {
  const defaultProps = {
    id: 'test-field',
    classNames: 'test-class',
    label: 'Test Label',
    required: false,
    description: 'Test description',
    errors: [],
    rawErrors: [],
    rawHelp: '',
    schema: { type: 'string', title: 'Test Field' },
    uiSchema: {},
    children: <input id="test-field" data-testid="test-input" />,
  };

  it('renders without crashing', () => {
    render(<FieldTemplate {...defaultProps} />);
    expect(screen.getByTestId('test-input')).toBeInTheDocument();
  });

  it('displays label', () => {
    render(<FieldTemplate {...defaultProps} />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('displays label from schema title when label prop is not provided', () => {
    render(
      <FieldTemplate
        {...defaultProps}
        label=""
        schema={{ type: 'string', title: 'Schema Title' }}
      />
    );
    expect(screen.getByText('Schema Title')).toBeInTheDocument();
  });

  it('displays label from uiSchema when available', () => {
    render(
      <FieldTemplate
        {...defaultProps}
        label=""
        uiSchema={{ 'ui:title': 'UI Schema Title' }}
      />
    );
    expect(screen.getByText('UI Schema Title')).toBeInTheDocument();
  });

  it('displays required indicator when required', () => {
    render(<FieldTemplate {...defaultProps} required />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('displays help text from description', () => {
    render(<FieldTemplate {...defaultProps} />);
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('displays help text from rawHelp', () => {
    render(<FieldTemplate {...defaultProps} rawHelp="Raw help text" />);
    expect(screen.getByText('Raw help text')).toBeInTheDocument();
  });

  it('displays help text from schema description', () => {
    render(
      <FieldTemplate
        {...defaultProps}
        description=""
        schema={{ type: 'string', description: 'Schema description' }}
      />
    );
    expect(screen.getByText('Schema description')).toBeInTheDocument();
  });

  it('displays error messages when errors are present', () => {
    render(
      <FieldTemplate
        {...defaultProps}
        rawErrors={['Error 1', 'Error 2']}
      />
    );
    expect(screen.getByText('Error 1')).toBeInTheDocument();
    expect(screen.getByText('Error 2')).toBeInTheDocument();
  });

  it('hides label when hideLabel option is set', () => {
    render(
      <FieldTemplate
        {...defaultProps}
        uiSchema={{ 'ui:options': { hideLabel: true } }}
      />
    );
    expect(screen.queryByText('Test Label')).not.toBeInTheDocument();
  });

  it('applies custom classNames', () => {
    const { container } = render(<FieldTemplate {...defaultProps} />);
    expect(container.firstChild).toHaveClass('test-class');
  });

  it('renders children', () => {
    render(<FieldTemplate {...defaultProps} />);
    expect(screen.getByTestId('test-input')).toBeInTheDocument();
  });
});

