import React from 'react';
import { render, screen } from '@testing-library/react';
import ObjectFieldTemplate from '../ObjectFieldTemplate';

describe('ObjectFieldTemplate', () => {
  const defaultProps = {
    title: 'Test Object',
    description: 'Test description',
    properties: [
      {
        content: <div key="prop1" data-testid="property-1">Property 1</div>,
      },
      {
        content: <div key="prop2" data-testid="property-2">Property 2</div>,
      },
    ],
    required: false,
    disabled: false,
    readonly: false,
    uiSchema: {},
    idSchema: { $id: 'test-object' },
    formData: {},
    schema: { type: 'object', title: 'Test Object' },
  };

  it('renders without crashing', () => {
    render(<ObjectFieldTemplate {...defaultProps} />);
    expect(screen.getByTestId('property-1')).toBeInTheDocument();
  });

  it('displays title', () => {
    render(<ObjectFieldTemplate {...defaultProps} />);
    expect(screen.getByText('Test Object')).toBeInTheDocument();
  });

  it('displays title from schema when title prop is not provided', () => {
    render(
      <ObjectFieldTemplate
        {...defaultProps}
        title=""
        schema={{ type: 'object', title: 'Schema Title' }}
      />
    );
    expect(screen.getByText('Schema Title')).toBeInTheDocument();
  });

  it('displays title from uiSchema when available', () => {
    render(
      <ObjectFieldTemplate
        {...defaultProps}
        title=""
        uiSchema={{ 'ui:title': 'UI Schema Title' }}
      />
    );
    expect(screen.getByText('UI Schema Title')).toBeInTheDocument();
  });

  it('displays required indicator when required', () => {
    render(<ObjectFieldTemplate {...defaultProps} required />);
    expect(screen.getByText('Test Object')).toBeInTheDocument();
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('displays description', () => {
    render(<ObjectFieldTemplate {...defaultProps} />);
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('renders all properties', () => {
    render(<ObjectFieldTemplate {...defaultProps} />);
    expect(screen.getByTestId('property-1')).toBeInTheDocument();
    expect(screen.getByTestId('property-2')).toBeInTheDocument();
  });

  it('renders as simple div when no title', () => {
    render(
      <ObjectFieldTemplate
        {...defaultProps}
        title=""
        schema={{ type: 'object' }}
      />
    );
    expect(screen.getByTestId('property-1')).toBeInTheDocument();
    expect(screen.queryByText('Test Object')).not.toBeInTheDocument();
  });

  it('respects defaultOpen option', () => {
    const { container } = render(
      <ObjectFieldTemplate
        {...defaultProps}
        uiSchema={{ 'ui:options': { defaultOpen: true } }}
      />
    );
    const panelBody = container.querySelector('.panel-body');
    expect(panelBody).toHaveClass('open');
  });
});

