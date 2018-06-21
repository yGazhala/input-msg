# ngx-input-msg

Provides form input live validation for Angular 5+ projects. [Demo](https://ygazhala.github.io/input-msg)

This project is inspired by AngularJS ng-messages module.

## Features

- Integrated with Angular template driven forms.

- Minifies boilerplate code, easy to add error messages to form inputs.

- Supports HTML5 like validation syntax (required, min, max, minlength, maxlength, pattern). It is also provides email and integer validators.

- Flexible. You can configure error messages once via InputMsgConfigService and provide them to the entire application or set the specific message to the specific input.

- Compatible with Angular Material Design form-field element as well as basic HTML input.

## Get started

1. Install Module to your Angular project via: `npm install ngx-input-msg --save`.

2. Import `InputMsgModule` to your feature module.

```typescript
import { NgModule } from '@angular/core';
import { InputMsgModule } from 'ngx-input-msg';

@NgModule({
  imports: [
    InputMsgModule
  ],
  declarations: [],
  providers: []
})
export class FeatureModule { }
```

3. Provide [Angular Material](https://material.angular.io/) to the app, if you are going to use Material style inputs.

4. Inside a `<form>`, add `ngxInputText` directive to an `<input>` element, then append `<ngx-msg>` component to show error messages. See [Demo](https://ygazhala.github.io/input-msg)

## API Reference

### **AbstractInput**

This base class describes common properties and methods for all input directives. Each input directive extends AbstractInput to provide its specific validation parameters and behaviors.

**@Input() properties**

Name | Required | Reacts on changes\* | Description
--- | --- | --- | ---
id: *string* | Optional | no | Used to connect an input element with `<label>` element.
label: *string* | Optional | yes | An input label text.
model: *NgModel* | Required | no | An input NgModel instance.
name: *string* | Required | no |  An input name attribute.
placeholder: *string* | Optional | yes | An alias for `label` property. Used to be shown inside an error message.
required: *boolean* | Optional | yes | Checks if an input value is not empty.

> \* Whether an @Input argument could be changed after the directive has been initialized.

AbstractInput also toggles `ngx-input_invalid` CSS class when an input status changes.


### **InputEmailDirective extends AbstractInput**

Directive to validate an `<input>` or `<input type="email">` element as an email address.

**Selector:** `[ngxInputEmail]`

### **InputNumberDirective extends AbstractInput**

Directive to validate an `<input type="number">` element.

**Selector:** `[ngxInputNumber][type="number"]` 

**Optional @Input() properties**

Name | Reacts on changes | Description
--- | --- | ---
integer: *boolean* | yes | Checks if an input value is an integer.
max: *number* \| *string* | yes | Checks if an input value does not exceed `max` value.
min: *number* \| *string* | yes | Checks if an input value is not less than `min` value.

### **InputTextDirective extends AbstractInput**

Directive to validate text like `<input>` or `<textarea>` elements.

**Selector:** `input[ngxInputText], textarea[ngxInputText]`

**Optional @Input() properties**

Name | Reacts on changes | Description
--- | --- | ---
maxlength: *number* \| *string* | yes | Checks if an input value length does't exceed `maxlength` value.
minlength: *number* \| *string* | yes | Checks if an input value length is more than `minlength` value.
pattern: *RegExp* | yes | Checks if an input value matches with `pattern`.  

### **LabelDirective**

Highlights `<label>` element when a bound input is invalid. It is also toggles `ngx-input_invalid` CSS class when an input status changes.

**Selector:** `[ngxLabel]` 

**Required @Input() properties**

Name | Reacts on changes | Description
--- | --- | ---
for: string | no | An input `name` or `id` value. Used to connect `<label>` element with an input element. 


### **MsgComponent**

Displays a message for an input element depending on it`s validation status. Only one message can be shown at a time.

**Selector:** `ngx-msg` 

**@Input() properties**

Name | Required | Reacts on changes | Description
--- | --- | --- | ---
for: string | Required | no | An input `name` or `id` value. Used to connect `<ngx-msg>` component with an input element.
position: 'bottom-left' \| 'bottom-right' | Optional | yes | The position to show the message. Default 'bottom-left'.
email: string \| MsgFn\* | Optional | yes | An error message for an appropriate validation parameter.
integer: string \| MsgFn\* | Optional | yes | An error message for an appropriate validation parameter.
max: string \| MsgFn\* | Optional | yes | An error message for an appropriate validation parameter. 
maxlength: string \| MsgFn\* | Optional | yes | An error message for an appropriate validation parameter.
min: string \| MsgFn\* | Optional | yes | An error message for an appropriate validation parameter. 
minlength: string \| MsgFn\* | Optional | yes | An error message for an appropriate validation parameter.
pattern: string \| MsgFn\* | Optional | yes | An error message for an appropriate validation parameter.
required: string \| MsgFn\* | Optional | yes | An error message for an appropriate validation parameter.

> \* A function that returns an error message dynamically, depending on `label` (or `placeholder`) value.
>```typescript 
> type MsgFn = (label: string, validationParamValue?: any) => string;
>```


### **InputMsgConfigService**

Provides configuration for displaying messages. 

**Methods**

```typescript
  interface InputMsgConfigService {
    public get(): Config;
    public set(config: Config): void; 
  }

  
  interface Config {
    colors?: {
      // color to highlight <ngx-msg> and <label> elements when an input is invalid
      error?: string;
      // color to highlight <ngx-msg> element when max length was reached
      maxlength?: string;
    };
    // Position to show a message
    position?: 'bottom-left' | 'bottom-right';
    // Message texts
    msg?: {
      [validatorName: string]: string | MsgFn;
    };
  }
```
> Tip: set default messages by `set()` method to provide them to all `<ngx-msg>` components of the application. If a specific message is not provided to `<ngx-msg>` component, a default message is used instead. You could also use default messages from the box. See the default config below.

**Default Config**

```typescript
  {
    colors: {
      error: '#f44336',
      maxlength: 'grey'
    },
    position: 'bottom-left',
    msg: {
      email: (label: string) => `Wrong ${label}`,
      integer: 'Fractional digits are forbidden',
      max: (label: string, allowed: number) => `Maximum allowed ${label} is ${allowed}`,
      min: (label: string, allowed: number) => `Minimum allowed ${label} is ${allowed}`,
      maxlength: (label: string, allowed: number) => `Maximum ${allowed} chars limit was reached`,
      minlength: (label: string, allowed: number) => `At least ${allowed} chars length are required`,
      pattern: (label: string) => `Invalid ${label}`,
      required: (label: string) => `${label} is required`
    }
  };
```