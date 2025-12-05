// WordPress UI theme for react-jsonschema-form
// Import WordPress components styles to ensure widgets match WordPress admin styling
import '@wordpress/components/build-style/style.css';

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

