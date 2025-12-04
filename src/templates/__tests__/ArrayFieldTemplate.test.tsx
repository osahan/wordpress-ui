import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ArrayFieldTemplate from '../ArrayFieldTemplate';

describe('ArrayFieldTemplate', () => {
  // In v6, items is an array of ReactElements
  const createItem = (index: number) => (
    <div key={index} data-testid={`item-${index}`}>Item {index}</div>
  );

  const defaultProps = {
    canAdd: true,
    disabled: false,
    items: [createItem(0), createItem(1)],
    onAddClick: jest.fn(),
    readonly: false,
    required: false,
    schema: { type: 'array', title: 'Test Array', items: { type: 'string' } },
    title: 'Test Array',
    uiSchema: {},
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<ArrayFieldTemplate {...defaultProps} />);
    expect(screen.getByTestId('item-0')).toBeInTheDocument();
  });

  it('displays title', () => {
    render(<ArrayFieldTemplate {...defaultProps} />);
    expect(screen.getByText('Test Array')).toBeInTheDocument();
  });

  it('displays title from schema when title prop is not provided', () => {
    render(
      <ArrayFieldTemplate
        {...defaultProps}
        title=""
        schema={{ type: 'array', title: 'Schema Title' }}
      />
    );
    expect(screen.getByText('Schema Title')).toBeInTheDocument();
  });

  it('displays required indicator when required', () => {
    render(<ArrayFieldTemplate {...defaultProps} required />);
    // In v6, PanelBody title is a string that includes asterisk when required
    // Check for the title in the panel (not the button text)
    const panelTitle = screen.getByText('Test Array *');
    expect(panelTitle).toBeInTheDocument();
    expect(screen.getByText(/\*/)).toBeInTheDocument();
  });

  it('renders all items', () => {
    render(<ArrayFieldTemplate {...defaultProps} />);
    expect(screen.getByTestId('item-0')).toBeInTheDocument();
    expect(screen.getByTestId('item-1')).toBeInTheDocument();
  });

  it('displays add button when canAdd is true', () => {
    render(<ArrayFieldTemplate {...defaultProps} />);
    expect(screen.getByText(/Add Test Array/)).toBeInTheDocument();
  });

  it('does not display add button when canAdd is false', () => {
    render(<ArrayFieldTemplate {...defaultProps} canAdd={false} />);
    expect(screen.queryByText(/Add/)).not.toBeInTheDocument();
  });

  it('calls onAddClick when add button is clicked', async () => {
    const user = userEvent.setup();
    const handleAdd = jest.fn();
    render(<ArrayFieldTemplate {...defaultProps} onAddClick={handleAdd} />);
    const addButton = screen.getByText(/Add Test Array/);

    await user.click(addButton);
    expect(handleAdd).toHaveBeenCalled();
  });

  // Note: Remove button functionality is now handled by ArrayFieldItemTemplate in v6
  // The items prop is now an array of ReactElements, not objects with hasRemove property

  it('uses custom add button text from uiSchema', () => {
    render(
      <ArrayFieldTemplate
        {...defaultProps}
        uiSchema={{ 'ui:options': { addButtonText: 'Add New Item' } }}
      />
    );
    expect(screen.getByText('Add New Item')).toBeInTheDocument();
  });

  it('renders in panel when usePanel is true', () => {
    const { container } = render(
      <ArrayFieldTemplate
        {...defaultProps}
        uiSchema={{ 'ui:options': { usePanel: true } }}
      />
    );
    expect(container.querySelector('.panel')).toBeInTheDocument();
  });

  it('renders without panel when usePanel is false', () => {
    const { container } = render(
      <ArrayFieldTemplate
        {...defaultProps}
        title=""
        uiSchema={{ 'ui:options': { usePanel: false } }}
      />
    );
    expect(container.querySelector('.panel')).not.toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', async () => {
    const user = userEvent.setup();
    const handleAdd = jest.fn();
    render(
      <ArrayFieldTemplate
        {...defaultProps}
        disabled
        onAddClick={handleAdd}
      />
    );
    const addButton = screen.getByText(/Add Test Array/);

    await user.click(addButton);
    expect(handleAdd).not.toHaveBeenCalled();
  });
});

