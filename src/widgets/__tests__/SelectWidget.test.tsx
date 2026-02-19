import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import SelectWidget from '../SelectWidget';

describe('SelectWidget', () => {
    const defaultProps = {
        id: 'test-select',
        onBlur: jest.fn(),
        onChange: jest.fn(),
        onFocus: jest.fn(),
        options: {
            enumOptions: [
                { label: 'Option 1', value: 'opt1' },
                { label: 'Option 2', value: 'opt2' },
                { label: 'Option 3', value: 'opt3' },
            ],
        },
        schema: { title: 'Test Select', type: 'string' },
        uiSchema: {},
        value: '',
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders without crashing', () => {
        render(<SelectWidget {...defaultProps} />);
        expect(screen.getByTestId('test-select')).toBeInTheDocument();
    });

    it('displays label from schema title', () => {
        render(<SelectWidget {...defaultProps} />);
        expect(screen.getByLabelText('Test Select')).toBeInTheDocument();
    });

    it('renders all options', () => {
        render(<SelectWidget {...defaultProps} />);
        expect(screen.getByText('Option 1')).toBeInTheDocument();
        expect(screen.getByText('Option 2')).toBeInTheDocument();
        expect(screen.getByText('Option 3')).toBeInTheDocument();
    });

    it('displays selected value', () => {
        render(<SelectWidget {...defaultProps} value="opt2" />);
        const select = screen.getByTestId('test-select');
        expect(select).toHaveValue('opt2');
    });

    it('calls onChange when selection changes', async () => {
        const user = userEvent.setup();
        const handleChange = jest.fn();
        render(<SelectWidget {...defaultProps} onChange={handleChange} />);
        const select = screen.getByTestId('test-select');

        await user.selectOptions(select, 'opt2');
        expect(handleChange).toHaveBeenCalledWith('opt2');
    });

    it('calls onBlur when select loses focus', async () => {
        const user = userEvent.setup();
        const handleBlur = jest.fn();
        render(<SelectWidget {...defaultProps} onBlur={handleBlur} />);
        const select = screen.getByTestId('test-select');

        await user.click(select);
        await user.tab();
        expect(handleBlur).toHaveBeenCalledWith('test-select', '');
    });

    it('displays required indicator when required', () => {
        render(<SelectWidget {...defaultProps} required />);
        expect(screen.getByLabelText(/Test Select \*/)).toBeInTheDocument();
    });

    it('displays help text from schema description', () => {
        render(
            <SelectWidget
                {...defaultProps}
                schema={{ description: 'Help text', title: 'Test', type: 'string' }}
            />,
        );
        expect(screen.getByText('Help text')).toBeInTheDocument();
    });

    it('is disabled when disabled prop is true', () => {
        render(<SelectWidget {...defaultProps} disabled />);
        const select = screen.getByTestId('test-select');
        expect(select).toBeDisabled();
    });

    it('handles numeric enum values', () => {
        render(
            <SelectWidget
                {...defaultProps}
                options={{
                    enumOptions: [
                        { label: 'One', value: 1 },
                        { label: 'Two', value: 2 },
                    ],
                }}
                value={1}
            />,
        );
        const select = screen.getByTestId('test-select');
        expect(select).toHaveValue('1');
    });

    it('applies error class when there are errors', () => {
        render(<SelectWidget {...defaultProps} rawErrors={['Error message']} />);
        const control = screen.getByTestId('test-select').closest('.select-control');
        expect(control).toHaveClass('has-error');
    });
});
