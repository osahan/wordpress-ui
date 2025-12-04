// WordPress UI theme for react-jsonschema-form
// Import WordPress components styles to ensure widgets match WordPress admin styling
import '@wordpress/components/build-style/style.css';

import type {
  ThemeProps,
  WrapIfAdditionalTemplateProps,
} from '@rjsf/core';

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

// Import WordPress-based fields
import TitleField from './fields/TitleField';
import DescriptionField from './fields/DescriptionField';

// Theme object
export const wordpressUITheme: ThemeProps = {
  widgets: {
    BaseInput,
    TextWidget: BaseInput,
    InputWidget: BaseInput,
    // Lowercase aliases for ui:widget usage
    text: BaseInput,
    string: BaseInput,
    select: SelectWidget,
    SelectWidget,
    checkbox: CheckboxWidget,
    CheckboxWidget,
    textarea: TextareaWidget,
    TextareaWidget,
    radio: RadioWidget,
    RadioWidget,
    checkboxes: CheckboxesWidget,
    CheckboxesWidget,
    // Register 'number' widget for number type fields - MUST be lowercase for ui:widget
    number: NumberWidget,
    NumberWidget,
    password: PasswordWidget,
    PasswordWidget,
    email: EmailWidget,
    EmailWidget,
    url: URLWidget,
    URLWidget,
    date: DateWidget,
    DateWidget,
    datetime: DateTimeWidget,
    DateTimeWidget,
    'datetime-local': DateTimeWidget,
    time: TimeWidget,
    TimeWidget,
    updown: UpDownWidget,
    UpDownWidget,
    range: RangeWidget,
    RangeWidget,
    hidden: HiddenWidget,
    HiddenWidget,
  },
  templates: {
    ArrayFieldItemTemplate,
    ArrayFieldTemplate,
    BaseInputTemplate,
    ButtonTemplates: {
      AddButton,
      CopyButton,
      MoveDownButton,
      MoveUpButton,
      RemoveButton,
      SubmitButton,
    },
    DescriptionFieldTemplate: DescriptionField,
    ErrorListTemplate,
    FieldErrorTemplate,
    FieldHelpTemplate,
    FieldTemplate,
    GridTemplate,
    MultiSchemaFieldTemplate,
    ObjectFieldTemplate,
    OptionalDataControlsTemplate,
    TitleFieldTemplate: TitleField,
    WrapIfAdditionalTemplate,
  },
  fields: {
    TitleField,
    DescriptionField,
  },
};

// Default export for convenience
export default wordpressUITheme;

