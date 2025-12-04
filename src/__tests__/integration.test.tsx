import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from '@rjsf/core';
import wordpressUITheme from '../index';

describe('WordPress UI Theme Integration', () => {
  it('renders a form with the custom theme', () => {
    const schema = {
      type: 'object',
      title: 'Test Form',
      properties: {
        name: {
          type: 'string',
          title: 'Name',
        },
      },
    };

    render(<Form schema={schema} theme={wordpressUITheme} />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
  });

  it('renders text input widget', () => {
    const schema = {
      type: 'object',
      properties: {
        text: {
          type: 'string',
          title: 'Text Field',
        },
      },
    };

    render(<Form schema={schema} theme={wordpressUITheme} />);
    expect(screen.getByLabelText('Text Field')).toBeInTheDocument();
  });

  it('renders textarea widget', () => {
    const schema = {
      type: 'object',
      properties: {
        bio: {
          type: 'string',
          title: 'Biography',
        },
      },
    };

    const uiSchema = {
      bio: {
        'ui:widget': 'textarea',
      },
    };

    render(<Form schema={schema} uiSchema={uiSchema} theme={wordpressUITheme} />);
    const textarea = screen.getByLabelText('Biography');
    expect(textarea.tagName).toBe('TEXTAREA');
  });

  it('renders select widget', () => {
    const schema = {
      type: 'object',
      properties: {
        role: {
          type: 'string',
          title: 'Role',
          enum: ['admin', 'editor', 'author'],
          enumNames: ['Administrator', 'Editor', 'Author'],
        },
      },
    };

    render(<Form schema={schema} theme={wordpressUITheme} />);
    expect(screen.getByLabelText('Role')).toBeInTheDocument();
    expect(screen.getByText('Administrator')).toBeInTheDocument();
  });

  it('renders checkbox widget', () => {
    const schema = {
      type: 'object',
      properties: {
        newsletter: {
          type: 'boolean',
          title: 'Subscribe to newsletter',
        },
      },
    };

    render(<Form schema={schema} theme={wordpressUITheme} />);
    expect(screen.getByLabelText('Subscribe to newsletter')).toBeInTheDocument();
  });

  it('renders radio widget', () => {
    const schema = {
      type: 'object',
      properties: {
        choice: {
          type: 'string',
          title: 'Choice',
          enum: ['option1', 'option2'],
          enumNames: ['Option 1', 'Option 2'],
        },
      },
    };

    const uiSchema = {
      choice: {
        'ui:widget': 'radio',
      },
    };

    render(<Form schema={schema} uiSchema={uiSchema} theme={wordpressUITheme} />);
    expect(screen.getByText('Choice')).toBeInTheDocument();
    expect(screen.getByTestId(/choice-option1/)).toBeInTheDocument();
  });

  it('handles form submission', async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();
    const schema = {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          title: 'Name',
        },
      },
    };

    render(
      <Form schema={schema} theme={wordpressUITheme} onSubmit={onSubmit} />
    );

    const input = screen.getByLabelText('Name');
    await user.type(input, 'Test User');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    expect(onSubmit).toHaveBeenCalled();
  });

  it('displays validation errors', () => {
    const schema = {
      type: 'object',
      required: ['name'],
      properties: {
        name: {
          type: 'string',
          title: 'Name',
        },
      },
    };

    render(<Form schema={schema} theme={wordpressUITheme} />);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    submitButton.click();

    // Form should show validation errors
    expect(screen.getByText(/required/i)).toBeInTheDocument();
  });

  it('renders object field template', () => {
    const schema = {
      type: 'object',
      title: 'User Information',
      properties: {
        name: {
          type: 'string',
          title: 'Name',
        },
        email: {
          type: 'string',
          title: 'Email',
        },
      },
    };

    render(<Form schema={schema} theme={wordpressUITheme} />);
    expect(screen.getByText('User Information')).toBeInTheDocument();
  });

  it('renders array field template', () => {
    const schema = {
      type: 'object',
      properties: {
        tags: {
          type: 'array',
          title: 'Tags',
          items: {
            type: 'string',
          },
        },
      },
    };

    render(<Form schema={schema} theme={wordpressUITheme} />);
    expect(screen.getByText('Tags')).toBeInTheDocument();
    expect(screen.getByText(/Add Tags/)).toBeInTheDocument();
  });

  it('handles required fields', () => {
    const schema = {
      type: 'object',
      required: ['name'],
      properties: {
        name: {
          type: 'string',
          title: 'Name',
        },
      },
    };

    render(<Form schema={schema} theme={wordpressUITheme} />);
    expect(screen.getByLabelText(/Name \*/)).toBeInTheDocument();
  });

  it('displays help text from schema description', () => {
    const schema = {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          title: 'Name',
          description: 'Enter your full name',
        },
      },
    };

    render(<Form schema={schema} theme={wordpressUITheme} />);
    expect(screen.getByText('Enter your full name')).toBeInTheDocument();
  });
});

