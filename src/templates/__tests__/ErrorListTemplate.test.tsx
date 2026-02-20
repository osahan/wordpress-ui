import React from 'react';
import { render, screen } from '@testing-library/react';

import ErrorListTemplate from '../ErrorListTemplate';

describe('ErrorListTemplate', () => {
    it('returns null when there are no errors', () => {
        const { container } = render(<ErrorListTemplate errors={[]} />);
        expect(container.firstChild).toBeNull();
    });

    it('returns null when errors is undefined', () => {
        const { container } = render(<ErrorListTemplate errors={undefined} />);
        expect(container.firstChild).toBeNull();
    });

    it('renders error list when errors are present', () => {
        const errors = [{ stack: 'Error 1' }, { stack: 'Error 2' }];
        render(<ErrorListTemplate errors={errors} />);
        expect(screen.getByText('Please correct the following errors:')).toBeInTheDocument();
        expect(screen.getByText('Error 1')).toBeInTheDocument();
        expect(screen.getByText('Error 2')).toBeInTheDocument();
    });

    it('renders error message when error is a string', () => {
        const errors = [{ stack: 'Error message' }];
        render(<ErrorListTemplate errors={errors} />);
        expect(screen.getByText('Error message')).toBeInTheDocument();
    });

    it('renders error object directly when stack is not available', () => {
        const errors = ['Simple error string'];
        render(<ErrorListTemplate errors={errors as any} />);
        expect(screen.getByText('Simple error string')).toBeInTheDocument();
    });

    it('displays errors in a list', () => {
        const errors = [{ stack: 'Error 1' }, { stack: 'Error 2' }, { stack: 'Error 3' }];
        render(<ErrorListTemplate errors={errors} />);
        const listItems = screen.getAllByRole('listitem');
        expect(listItems).toHaveLength(3);
    });

    it('has error notice styling', () => {
        const errors = [{ stack: 'Error message' }];
        const { container } = render(<ErrorListTemplate errors={errors} />);
        expect(container.querySelector('.notice-error')).toBeInTheDocument();
    });

    it('is not dismissible', () => {
        const errors = [{ stack: 'Error message' }];
        const { container } = render(<ErrorListTemplate errors={errors} />);
        const notice = container.querySelector('.notice');
        expect(notice).not.toHaveClass('is-dismissible');
    });
});
