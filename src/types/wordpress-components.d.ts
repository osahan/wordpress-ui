declare module '@wordpress/components' {
    import type { ReactNode, ComponentType, ButtonHTMLAttributes } from 'react';

    export interface BaseControlProps {
        children?: ReactNode;
        className?: string;
        help?: ReactNode;
        id?: string;
        label?: ReactNode;
    }

    export const BaseControl: ComponentType<BaseControlProps>;

    export interface TextControlProps {
        autoFocus?: boolean;
        className?: string;
        disabled?: boolean;
        help?: string;
        id?: string;
        label?: string;
        onBlur?: () => void;
        onChange?: (value: string) => void;
        onFocus?: () => void;
        placeholder?: string;
        required?: boolean;
        step?: number;
        type?: string;
        value?: string;
    }

    export const TextControl: ComponentType<TextControlProps>;

    export interface TextareaControlProps {
        className?: string;
        disabled?: boolean;
        help?: string;
        id?: string;
        label?: string;
        onBlur?: () => void;
        onChange?: (value: string) => void;
        onFocus?: () => void;
        required?: boolean;
        rows?: number;
        value?: string;
    }

    export const TextareaControl: ComponentType<TextareaControlProps>;

    export interface SelectControlProps {
        className?: string;
        disabled?: boolean;
        help?: string;
        id?: string;
        label?: string;
        onBlur?: () => void;
        onChange?: (value: string) => void;
        onFocus?: () => void;
        options?: Array<{ label: string; value: string }>;
        required?: boolean;
        value?: string;
    }

    export const SelectControl: ComponentType<SelectControlProps>;

    export interface CheckboxControlProps {
        checked?: boolean;
        className?: string;
        disabled?: boolean;
        help?: string;
        id?: string;
        label?: string;
        onBlur?: () => void;
        onChange?: (checked: boolean) => void;
        onFocus?: () => void;
        required?: boolean;
    }

    export const CheckboxControl: ComponentType<CheckboxControlProps>;

    export interface RadioControlProps {
        className?: string;
        disabled?: boolean;
        help?: string;
        id?: string;
        label?: string;
        onBlur?: () => void;
        onChange?: (value: string) => void;
        onFocus?: () => void;
        options?: Array<{ label: string; value: string }>;
        required?: boolean;
        selected?: string;
    }

    export const RadioControl: ComponentType<RadioControlProps>;

    export interface RangeControlProps {
        disabled?: boolean;
        help?: string;
        id?: string;
        label?: string;
        max?: number;
        min?: number;
        onBlur?: () => void;
        onChange?: (value: number) => void;
        onFocus?: () => void;
        required?: boolean;
        step?: number;
        value?: number;
    }

    export const RangeControl: ComponentType<RangeControlProps>;

    export interface PanelProps {
        children?: ReactNode;
        className?: string;
    }

    export const Panel: ComponentType<PanelProps>;

    export interface PanelBodyProps {
        children?: ReactNode;
        initialOpen?: boolean;
        title?: string;
    }

    export const PanelBody: ComponentType<PanelBodyProps>;

    export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
        children?: ReactNode;
        isDestructive?: boolean;
        variant?: string;
    }

    export const Button: ComponentType<ButtonProps>;

    export interface NoticeProps {
        children?: ReactNode;
        isDismissible?: boolean;
        status?: 'error' | 'info' | 'success' | 'warning';
    }

    export const Notice: ComponentType<NoticeProps>;
}
