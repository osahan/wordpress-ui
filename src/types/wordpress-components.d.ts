declare module '@wordpress/components' {
  import { ReactNode, ComponentType, HTMLAttributes, ButtonHTMLAttributes } from 'react';
  
  export interface BaseControlProps {
    id?: string;
    label?: ReactNode;
    help?: ReactNode;
    className?: string;
    children?: ReactNode;
  }
  
  export const BaseControl: ComponentType<BaseControlProps>;
  
  export interface TextControlProps {
    id?: string;
    label?: string;
    value?: string;
    onChange?: (value: string) => void;
    onBlur?: () => void;
    onFocus?: () => void;
    help?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
    type?: string;
    placeholder?: string;
    autoFocus?: boolean;
    step?: number;
  }
  
  export const TextControl: ComponentType<TextControlProps>;
  
  export interface TextareaControlProps {
    id?: string;
    label?: string;
    value?: string;
    onChange?: (value: string) => void;
    onBlur?: () => void;
    onFocus?: () => void;
    help?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
    rows?: number;
  }
  
  export const TextareaControl: ComponentType<TextareaControlProps>;
  
  export interface SelectControlProps {
    id?: string;
    label?: string;
    value?: string;
    options?: Array<{ label: string; value: string }>;
    onChange?: (value: string) => void;
    onBlur?: () => void;
    onFocus?: () => void;
    help?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
  }
  
  export const SelectControl: ComponentType<SelectControlProps>;
  
  export interface CheckboxControlProps {
    id?: string;
    label?: string;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    onBlur?: () => void;
    onFocus?: () => void;
    help?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
  }
  
  export const CheckboxControl: ComponentType<CheckboxControlProps>;
  
  export interface RadioControlProps {
    id?: string;
    label?: string;
    selected?: string;
    options?: Array<{ label: string; value: string }>;
    onChange?: (value: string) => void;
    onBlur?: () => void;
    onFocus?: () => void;
    help?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
  }
  
  export const RadioControl: ComponentType<RadioControlProps>;
  
  export interface RangeControlProps {
    id?: string;
    label?: string;
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    onChange?: (value: number) => void;
    onBlur?: () => void;
    onFocus?: () => void;
    help?: string;
    required?: boolean;
    disabled?: boolean;
  }
  
  export const RangeControl: ComponentType<RangeControlProps>;
  
  export interface PanelProps {
    children?: ReactNode;
    className?: string;
  }
  
  export const Panel: ComponentType<PanelProps>;
  
  export interface PanelBodyProps {
    title?: string;
    children?: ReactNode;
    initialOpen?: boolean;
  }
  
  export const PanelBody: ComponentType<PanelBodyProps>;
  
  export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: string;
    isDestructive?: boolean;
    children?: ReactNode;
  }
  
  export const Button: ComponentType<ButtonProps>;
  
  export interface NoticeProps {
    status?: 'error' | 'warning' | 'info' | 'success';
    children?: ReactNode;
    isDismissible?: boolean;
  }
  
  export const Notice: ComponentType<NoticeProps>;
}

