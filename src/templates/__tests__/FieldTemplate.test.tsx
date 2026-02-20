import React from 'react';
import { render, screen } from '@testing-library/react';

import FieldTemplate from '../FieldTemplate';

describe('FieldTemplate', () => {
    const defaultProps = {
        children: <input data-testid="test-input" id="test-field" />,
        classNames: 'test-class',
        description: 'Test description',
        errors: [],
        id: 'test-field',
        label: 'Test Label',
        rawErrors: [],
        rawHelp: '',
        registry: {},
        required: false,
        schema: { title: 'Test Field', type: 'string' },
        uiSchema: {},
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
            <FieldTemplate {...defaultProps} label="" schema={{ title: 'Schema Title', type: 'string' }} />,
        );
        expect(screen.getByText('Schema Title')).toBeInTheDocument();
    });

    it('displays label from uiSchema when available', () => {
        render(<FieldTemplate {...defaultProps} label="" uiSchema={{ 'ui:title': 'UI Schema Title' }} />);
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
                schema={{ description: 'Schema description', type: 'string' }}
            />,
        );
        expect(screen.getByText('Schema description')).toBeInTheDocument();
    });

    it('displays error messages when errors are present', () => {
        render(<FieldTemplate {...defaultProps} rawErrors={['Error 1', 'Error 2']} />);
        expect(screen.getByText('Error 1')).toBeInTheDocument();
        expect(screen.getByText('Error 2')).toBeInTheDocument();
    });

    it('hides label when hideLabel option is set', () => {
        render(<FieldTemplate {...defaultProps} uiSchema={{ 'ui:options': { hideLabel: true } }} />);
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
