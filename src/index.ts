// WordPress UI theme for react-jsonschema-form
//
// WordPress component styles are NOT automatically imported to prevent conflicts
// in WordPress environments where styles are already loaded via wp_enqueue_style().
//
// For non-WordPress environments, import styles manually:
//   import '@wordpress/components/build-style/style.css';
//
// In WordPress environments, styles are typically already loaded, so no action needed.

// Inject custom theme styles for sticky accordion titles and improved nested UI
// Using JavaScript injection to avoid bundler CSS import issues
if (typeof document !== 'undefined' && !document.getElementById('wordpress-ui-theme-styles')) {
    const style = document.createElement('style');
    style.id = 'wordpress-ui-theme-styles';
    style.textContent = `
    /* WordPress UI Theme Custom Styles - Scoped to RJSF forms only */
    /* All styles are scoped under .rjsf to prevent CSS bleeding */
    
    /* Make accordion panel titles sticky when scrolling - scoped to RJSF forms */
    .rjsf .components-panel__body-title {
      position: sticky;
      top: 0;
      z-index: 10;
      background-color: #fff;
      margin: 0;
      padding: 0;
    }
    
    /* Ensure the button inside the title is also sticky */
    .rjsf .components-panel__body-title button {
      background-color: #fff;
      width: 100%;
    }
    
    /* Add a subtle border-bottom when sticky to separate from content above */
    .rjsf .components-panel__body-title::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 1px;
      background-color: #ddd;
      opacity: 0;
      transition: opacity 0.2s;
    }
    
    /* Show border when scrolled (sticky state) */
    .rjsf .components-panel__body-title:has(button:focus)::after,
    .rjsf .components-panel__body-title:hover::after {
      opacity: 1;
    }
    
    /* Ensure proper stacking context for nested panels */
    .rjsf .components-panel {
      position: relative;
    }
    
    /* Adjust z-index for nested panels to maintain proper stacking */
    .rjsf .components-panel .components-panel .components-panel__body-title {
      z-index: 11;
    }
    
    .rjsf .components-panel .components-panel .components-panel .components-panel__body-title {
      z-index: 12;
    }
    
    .rjsf .components-panel .components-panel .components-panel .components-panel .components-panel__body-title {
      z-index: 13;
    }
    
    /* Minimal nested UI styling - keep close to WordPress defaults */
    
    /* Simple indentation for nested panels - consistent 1rem spacing */
    .rjsf .rjsf-object-field .rjsf-object-field .components-panel {
      margin-left: 1rem;
    }
    
    .rjsf .rjsf-object-field .rjsf-object-field .rjsf-object-field .components-panel {
      margin-left: 1rem;
    }
    
    .rjsf .rjsf-object-field .rjsf-object-field .rjsf-object-field .rjsf-object-field .components-panel {
      margin-left: 1rem;
    }
    
    /* Subtle focus highlighting - only when field is focused */
    .rjsf .components-panel__body:focus-within {
      outline: 1px solid #0073aa;
      outline-offset: -1px;
    }
  `;
    document.head.appendChild(style);
}

import type { ComponentType } from 'react';
import { withTheme, type FormProps, type ThemeProps } from '@rjsf/core';
import type { RJSFSchema, FormContextType, StrictRJSFSchema } from '@rjsf/utils';

// Import WordPress-based widgets
import BaseInput from './widgets/BaseInput';
import URLWidget from './widgets/URLWidget';
// Import WordPress-based fields (used in templates)
import TitleField from './fields/TitleField';
import DateWidget from './widgets/DateWidget';
import TimeWidget from './widgets/TimeWidget';
import RadioWidget from './widgets/RadioWidget';
import EmailWidget from './widgets/EmailWidget';
import RangeWidget from './widgets/RangeWidget';
import SelectWidget from './widgets/SelectWidget';
import NumberWidget from './widgets/NumberWidget';
import UpDownWidget from './widgets/UpDownWidget';
import HiddenWidget from './widgets/HiddenWidget';
import GridTemplate from './templates/GridTemplate';
import TextareaWidget from './widgets/TextareaWidget';
import CheckboxWidget from './widgets/CheckboxWidget';
import PasswordWidget from './widgets/PasswordWidget';
import DateTimeWidget from './widgets/DateTimeWidget';
// Import WordPress-based templates
import FieldTemplate from './templates/FieldTemplate';
import DescriptionField from './fields/DescriptionField';
import CheckboxesWidget from './widgets/CheckboxesWidget';
import ErrorListTemplate from './templates/ErrorListTemplate';
import BaseInputTemplate from './templates/BaseInputTemplate';
import FieldHelpTemplate from './templates/FieldHelpTemplate';
import ArrayFieldTemplate from './templates/ArrayFieldTemplate';
import FieldErrorTemplate from './templates/FieldErrorTemplate';
import ObjectFieldTemplate from './templates/ObjectFieldTemplate';
import ArrayFieldItemTemplate from './templates/ArrayFieldItemTemplate';
import WrapIfAdditionalTemplate from './templates/WrapIfAdditionalTemplate';
import MultiSchemaFieldTemplate from './templates/MultiSchemaFieldTemplate';
import OptionalDataControlsTemplate from './templates/OptionalDataControlsTemplate';
import {
    AddButton,
    CopyButton,
    SubmitButton,
    MoveUpButton,
    RemoveButton,
    MoveDownButton,
} from './templates/buttons';

// Generate Form function
export function generateForm<
    T = any,
    S extends StrictRJSFSchema = RJSFSchema,
    F extends FormContextType = any,
>(): ComponentType<FormProps<T, S, F>> {
    return withTheme<T, S, F>(generateTheme<T, S, F>());
}

// Generate theme function
export function generateTheme<
    T = any,
    S extends StrictRJSFSchema = RJSFSchema,
    F extends FormContextType = any,
>(): ThemeProps<T, S, F> {
    return {
        templates: {
            ArrayFieldItemTemplate: ArrayFieldItemTemplate as any,
            ArrayFieldTemplate: ArrayFieldTemplate as any,
            BaseInputTemplate: BaseInputTemplate as any,
            ButtonTemplates: {
                AddButton,
                CopyButton,
                MoveDownButton,
                MoveUpButton,
                RemoveButton,
                SubmitButton,
            },
            DescriptionFieldTemplate: DescriptionField as any,
            ErrorListTemplate: ErrorListTemplate as any,
            FieldErrorTemplate: FieldErrorTemplate as any,
            FieldHelpTemplate: FieldHelpTemplate as any,
            FieldTemplate: FieldTemplate as any,
            GridTemplate: GridTemplate as any,
            MultiSchemaFieldTemplate: MultiSchemaFieldTemplate as any,
            ObjectFieldTemplate: ObjectFieldTemplate as any,
            OptionalDataControlsTemplate: OptionalDataControlsTemplate as any,
            TitleFieldTemplate: TitleField as any,
            WrapIfAdditionalTemplate: WrapIfAdditionalTemplate as any,
        },
        widgets: {
            BaseInput: BaseInput as any,
            checkbox: CheckboxWidget as any,
            checkboxes: CheckboxesWidget as any,
            CheckboxesWidget: CheckboxesWidget as any,
            CheckboxWidget: CheckboxWidget as any,
            date: DateWidget as any,
            datetime: DateTimeWidget as any,
            'datetime-local': DateTimeWidget as any,
            DateTimeWidget: DateTimeWidget as any,
            DateWidget: DateWidget as any,
            email: EmailWidget as any,
            EmailWidget: EmailWidget as any,
            hidden: HiddenWidget as any,
            HiddenWidget: HiddenWidget as any,
            InputWidget: BaseInput as any,
            // Register 'number' widget for number type fields - MUST be lowercase for ui:widget
            number: NumberWidget as any,
            NumberWidget: NumberWidget as any,
            password: PasswordWidget as any,
            PasswordWidget: PasswordWidget as any,
            radio: RadioWidget as any,
            RadioWidget: RadioWidget as any,
            range: RangeWidget as any,
            RangeWidget: RangeWidget as any,
            select: SelectWidget as any,
            SelectWidget: SelectWidget as any,
            string: BaseInput as any,
            // Lowercase aliases for ui:widget usage
            text: BaseInput as any,
            textarea: TextareaWidget as any,
            TextareaWidget: TextareaWidget as any,
            TextWidget: BaseInput as any,
            time: TimeWidget as any,
            TimeWidget: TimeWidget as any,
            updown: UpDownWidget as any,
            UpDownWidget: UpDownWidget as any,
            url: URLWidget as any,
            URLWidget: URLWidget as any,
        },
    } as unknown as ThemeProps<T, S, F>;
}

// Export default Form
export default generateForm();

// Export theme for advanced usage
export const wordpressUITheme = generateTheme();

// Re-export types for convenience
export type { FormProps } from '@rjsf/core';
export type { ThemeProps } from '@rjsf/core';
