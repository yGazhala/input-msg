# NgxInputMsg

Provides live form input validation for Angular 2+ projects. [Demo](https://ygazhala.github.io/input-msg)

This project is inspired by AngularJS ng-messages module.

## Features

- Integrated with Angular template driven forms.

- Easy to add validation through HTML, keeps a component clear from additional form control initializations.

- Supports HTML5 like validation syntax (required, min, max, minlength, maxlength, pattern). It is also provides email and integer validators.

- Flexible. You can configure error messages once via InputMsgConfigService and provide them to the entire application or set the specific message to the specific input.

- Compatible with Angular Material Design form-field element as well as basic HTML input.

## Get started

1. Copy `./src/app/input-msg` folder to your project.

2. Import `InputMsgModule` to your feature module. Note, `InputMsgModule` depends on `BrowserAnimationsModule`, so `BrowserAnimationsModule` should be imported to `app.module.ts`.

```typescript
// feature.module.ts example
import { NgModule } from '@angular/core';
import { InputMsgModule } from 'app/src/input-msg/input-msg.module';

@NgModule({
  imports: [
    InputMsgModule
  ],
  declarations: [],
  providers: []
})
export class FeatureModule { }


// app.module.ts example
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { FeatureModule } from 'app/src/feature-module/feature.module.ts'

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FeatureModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```

3. Provide [Angular Material](https://material.angular.io/) to the app, if you are going to use Material style inputs.

4. Inside a `<form>` element, add `ngxInputText` directive to an input element, then append `<ngx-msg>` component to show error messages. See [Demo](https://ygazhala.github.io/input-msg)

## API Reference

### **InputEmailDirective**

Directive to validate an `<input>` or `<input type="email">` element as an email address. It is also toggles `ngx-input_invalid` CSS class when an input status changes.

**Selector:** `[ngxInputEmail]`

**Required @Input() properties**

Note, these properties have not to be changed after an input element initializes.

Name | Description
--- | ---
model: *NgModel* | An input NgModel instance.
name: *string* |  An input name attribute.

**Optional @Input() properties**

Note, these properties (except `id`) react on changes, so you can change them after an input element initializes.

Name | Description
--- | ---
id: *string* | Used to connect an input element with `<label>` element.
label: *string* | An input label text.
placeholder: *string* | An alias for `label` property. Used to be shown inside an error message.
required: *boolean* | Checks if an input value is not empty.

### **InputNumberDirective**

Directive to validate an `<input type="number">` element. It is also toggles `ngx-input_invalid` CSS class when an input status changes.

**Selector:** `[ngxInputNumber][type="number"]` 

**Required @Input() properties**

Note, these properties have not to be changed after an input element initializes.

Name | Description
--- | ---
model: *NgModel* | An input NgModel instance.
name: *string* |  An input name attribute.

**Optional @Input() properties**

Note, these properties (except `id`) react on changes, so you can change them after an input element initializes.

Name | Description
--- | ---
id: *string* | Used to connect an input element with `<label>` element.
integer: *boolean* | Checks if an input value is an integer.
label: *string* | An input label text.
max: *number* \| *string* | Checks if an input value does not exceed `max` value.
min: *number* \| *string* | Checks if an input value is not less than `min` value.
placeholder: *string* | An alias for `label` property. Used to be shown inside an error message.
required: *boolean* | Checks if an input value is not empty.

### **InputTextDirective**

Directive to validate text like `<input>` or `<textarea>` elements. It is also toggles `ngx-input_invalid` CSS class when an input status changes.

**Selector:** `input[ngxInputText], textarea[ngxInputText]` 

**Required @Input() properties**

Note, these properties have not to be changed after an input element initializes.

Name | Description
--- | ---
model: *NgModel* | An input NgModel instance.
name: *string* |  An input name attribute.

**Optional @Input() properties**

Note, these properties (except `id`) react on changes, so you can change them after an input element initializes.

Name | Description
--- | ---
id: *string* | Used to connect an input element with `<label>` element.
label: *string* | An input label text. Used to be shown inside an error message.
maxlength: *number* \| *string* | Checks if an input value length does't exceed `maxlength` value.
minlength: *number* \| *string* | Checks if an input value length is more than `minlength` value.
pattern: *RegExp* | Checks if an input value matches with `pattern`.
placeholder: *string* | An alias for `label` property. Used to be shown inside an error message.
required: *boolean* | Checks if an input value is not empty.  

### **LabelDirective**

Highlights `<label>` element when a bound input is invalid. It is also toggles `ngx-input_invalid` CSS class when an input status changes.

**Selector:** `[ngxLabel]` 

**Required @Input() properties**

Name | Description
--- | ---
for: string | An input `name` or `id` value. Used to connect `<label>` element with an input element. 


### **MsgComponent**

Displays a message for an input element depending on it`s validation status. Only one message can be shown at a time.

**Selector:** `ngx-msg` 

**@Input() properties**

Name | Required | Description
--- | --- | ---
for: string | Required | An input `name` or `id` value. Used to connect `<ngx-msg>` component with an input element.
position: 'bottom-left' \| 'bottom-right' | Optional | The position to show the message. Default 'bottom-left'.
email: string \| MsgFn\* | Optional | An error message for an appropriate validation parameter.
integer: string \| MsgFn\* | Optional | An error message for an appropriate validation parameter.
max: string \| MsgFn\* | Optional | An error message for an appropriate validation parameter. 
maxlength: string \| MsgFn\* | Optional | An error message for an appropriate validation parameter.
min: string \| MsgFn\* | Optional | An error message for an appropriate validation parameter. 
minlength: string \| MsgFn\* | Optional | An error message for an appropriate validation parameter.
pattern: string \| MsgFn\* | Optional | An error message for an appropriate validation parameter.
required: string \| MsgFn\* | Optional | An error message for an appropriate validation parameter.

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