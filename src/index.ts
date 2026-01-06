// WordPress UI theme for react-jsonschema-form
// Import WordPress components styles to ensure widgets match WordPress admin styling
import '@wordpress/components/build-style/style.css';

// Inject custom theme styles for sticky accordion titles and improved nested UI
// Using JavaScript injection to avoid bundler CSS import issues
if (typeof document !== 'undefined' && !document.getElementById('wordpress-ui-theme-styles')) {
  const style = document.createElement('style');
  style.id = 'wordpress-ui-theme-styles';
  style.textContent = `
    /* WordPress UI Theme Custom Styles */
    
    /* Make accordion panel titles sticky when scrolling */
    .components-panel__body-title {
      position: sticky;
      top: 0;
      z-index: 10;
      background-color: #fff;
      margin: 0;
      padding: 0;
    }
    
    /* Ensure the button inside the title is also sticky */
    .components-panel__body-title button {
      background-color: #fff;
      width: 100%;
    }
    
    /* Add a subtle border-bottom when sticky to separate from content above */
    .components-panel__body-title::after {
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
    .components-panel__body-title:has(button:focus)::after,
    .components-panel__body-title:hover::after {
      opacity: 1;
    }
    
    /* Ensure proper stacking context for nested panels */
    .components-panel {
      position: relative;
    }
    
    /* Adjust z-index for nested panels to maintain proper stacking */
    .components-panel .components-panel .components-panel__body-title {
      z-index: 11;
    }
    
    .components-panel .components-panel .components-panel .components-panel__body-title {
      z-index: 12;
    }
    
    .components-panel .components-panel .components-panel .components-panel .components-panel__body-title {
      z-index: 13;
    }
    
    /* Minimal nested UI styling - keep close to WordPress defaults */
    
    /* Simple indentation for nested panels - consistent 1rem spacing */
    .rjsf-object-field .rjsf-object-field .components-panel {
      margin-left: 1rem;
    }
    
    .rjsf-object-field .rjsf-object-field .rjsf-object-field .components-panel {
      margin-left: 1rem;
    }
    
    .rjsf-object-field .rjsf-object-field .rjsf-object-field .rjsf-object-field .components-panel {
      margin-left: 1rem;
    }
    
    /* Subtle focus highlighting - only when field is focused */
    .components-panel__body:focus-within {
      outline: 1px solid #0073aa;
      outline-offset: -1px;
    }
  `;
  document.head.appendChild(style);
}

import { ComponentType } from 'react';
import { withTheme, type ThemeProps, type FormProps } from '@rjsf/core';
import type { FormContextType, RJSFSchema, StrictRJSFSchema } from '@rjsf/utils';

// Import WordPress-based widgets
import BaseInput from './widgets/BaseInput';
import TextWidget from './widgets/TextWidget';
import TextareaWidget from './widgets/TextareaWidget';
import SelectWidget from './widgets/SelectWidget';
import CheckboxWidget from './widgets/CheckboxWidget';
import RadioWidget from './widgets/RadioWidget';
import CheckboxesWidget from './widgets/CheckboxesWidget';
import NumberWidget from './widgets/NumberWidget';
import PasswordWidget from './widgets/PasswordWidget';
import EmailWidget from './widgets/EmailWidget';
import URLWidget from './widgets/URLWidget';
import DateWidget from './widgets/DateWidget';
import DateTimeWidget from './widgets/DateTimeWidget';
import TimeWidget from './widgets/TimeWidget';
import UpDownWidget from './widgets/UpDownWidget';
import RangeWidget from './widgets/RangeWidget';
import HiddenWidget from './widgets/HiddenWidget';

// Import WordPress-based templates
import FieldTemplate from './templates/FieldTemplate';
import ObjectFieldTemplate from './templates/ObjectFieldTemplate';
import ArrayFieldTemplate from './templates/ArrayFieldTemplate';
import ArrayFieldItemTemplate from './templates/ArrayFieldItemTemplate';
import ErrorListTemplate from './templates/ErrorListTemplate';
import WrapIfAdditionalTemplate from './templates/WrapIfAdditionalTemplate';
import BaseInputTemplate from './templates/BaseInputTemplate';
import FieldErrorTemplate from './templates/FieldErrorTemplate';
import FieldHelpTemplate from './templates/FieldHelpTemplate';
import GridTemplate from './templates/GridTemplate';
import MultiSchemaFieldTemplate from './templates/MultiSchemaFieldTemplate';
import OptionalDataControlsTemplate from './templates/OptionalDataControlsTemplate';
import {
  AddButton,
  SubmitButton,
  CopyButton,
  MoveDownButton,
  MoveUpButton,
  RemoveButton,
} from './templates/buttons';

// Import WordPress-based fields (used in templates)
import TitleField from './fields/TitleField';
import DescriptionField from './fields/DescriptionField';

// Generate theme function
export function generateTheme<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>(): ThemeProps<T, S, F> {
  return {
    widgets: {
      BaseInput: BaseInput as any,
      TextWidget: BaseInput as any,
      InputWidget: BaseInput as any,
      // Lowercase aliases for ui:widget usage
      text: BaseInput as any,
      string: BaseInput as any,
      select: SelectWidget as any,
      SelectWidget: SelectWidget as any,
      checkbox: CheckboxWidget as any,
      CheckboxWidget: CheckboxWidget as any,
      textarea: TextareaWidget as any,
      TextareaWidget: TextareaWidget as any,
      radio: RadioWidget as any,
      RadioWidget: RadioWidget as any,
      checkboxes: CheckboxesWidget as any,
      CheckboxesWidget: CheckboxesWidget as any,
      // Register 'number' widget for number type fields - MUST be lowercase for ui:widget
      number: NumberWidget as any,
      NumberWidget: NumberWidget as any,
      password: PasswordWidget as any,
      PasswordWidget: PasswordWidget as any,
      email: EmailWidget as any,
      EmailWidget: EmailWidget as any,
      url: URLWidget as any,
      URLWidget: URLWidget as any,
      date: DateWidget as any,
      DateWidget: DateWidget as any,
      datetime: DateTimeWidget as any,
      DateTimeWidget: DateTimeWidget as any,
      'datetime-local': DateTimeWidget as any,
      time: TimeWidget as any,
      TimeWidget: TimeWidget as any,
      updown: UpDownWidget as any,
      UpDownWidget: UpDownWidget as any,
      range: RangeWidget as any,
      RangeWidget: RangeWidget as any,
      hidden: HiddenWidget as any,
      HiddenWidget: HiddenWidget as any,
    },
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
  } as unknown as ThemeProps<T, S, F>;
}

// Generate Form function
export function generateForm<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>(): ComponentType<FormProps<T, S, F>> {
  return withTheme<T, S, F>(generateTheme<T, S, F>());
}

// Export default Form
export default generateForm();

// Export theme for advanced usage
export const wordpressUITheme = generateTheme();

// Re-export types for convenience
export type { FormProps } from '@rjsf/core';
export type { ThemeProps } from '@rjsf/core';

