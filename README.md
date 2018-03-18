# InputMsgModule

Provides live form input validation for Angular 2+ projects. [Demo](https://ygazhala.github.io/input-msg)

This project is inspired by AngularJS ng-messages module.

## Features

- Integrated with Angular template driven forms.

- Easy to add validation through HTML, keeps a component clear from additional form control initializations.

- Supports HTML5 like validation syntax (required, min, max, minlength, maxlength, email, pattern).

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

4. Inside a `<form>` element, add `gInput` directive to an input element, then append `<g-msg>` component to show error messages. See [Demo](https://ygazhala.github.io/input-msg)

## API Reference

### **InputDirective**

Directive to validate an `<input>` or `<textarea>` element. It is also toggles `g-input_invalid` CSS class when an input status changes.

**Selector:** `gInput` 

**Required @Input() properties**

Note, these properties have not to be changed after an input element initializes.

Name | Description
--- | ---
model: *NgModel* | An input NgModel instance.
name: *string* |  An input name attribute.
type: *string* | Used to apply compatible validators. Supported types: 'text', 'email', 'number' or 'password'. If 'email' type was set - input value would be validated as an email address.

**Optional @Input() properties**

Note, these properties (except `id`) react on changes, so you can change them after an input element initializes.

Name | Supported `<input type="">` | Description
--- | --- | ---
id: *string* | all\* | Used to connect an input element with `<label>` element.
integer: *boolean* | number | Checks if an input value is an integer
label: *string* | all\* | An input label text. Used to be shown inside an error message.
max: *number* \| *string* | number | Checks if an input value does not exceed `max` value.
maxlength: *number* \| *string* | text, password | Checks if an input value length does't exceed `maxlength` value.
min: *number* \| *string* | number | Checks if an input value is not less than `min` value.
minlength: *number* \| *string* | text, password | Checks if an input value length is more than `minlength` value.
pattern: *RegExp* | text, password | Checks if an input value matches with `pattern`
placeholder: *string* | all\* | An alias for `label` property. Used to be shown inside an error message.
required: *boolean* | all\* | Checks if an input value is not empty.

> all\* means 'email', 'text', 'password' and 'number' types.  

### **LabelDirective**

Highlights `<label>` element when a bound input is invalid. It is also toggles `g-input_invalid` CSS class when an input status changes.

**Selector:** `gLabel` 

**@Input() properties**

Name | Required | Description
--- | --- | ---
for: string | Required | An input `name` or `id` value. Used to connect `<label>` element with an input element. 


### **MsgComponent**

Displays a message for an input element depending on it`s validation status. Only one message can be shown at a time.

**Selector:** `g-msg` 

**@Input() properties**

Name | Required | Description
--- | --- | ---
for: string | Required | An input `name` or `id` value. Used to connect `<g-msg>` component with an input element.
position: 'bottom-left' \| 'bottom-right' | Optional | The position to show the message. Default 'bottom-left'.
email: string \| MsgFn\* | Optional | An error message for an appropriate validation parameter.
integer: string \| MsgFn\* | Optional | An error message for an appropriate validation parameter.
max: string \| ExtendedMsgFn\*\* | Optional | An error message for an appropriate validation parameter. 
maxlength: string \| ExtendedMsgFn\*\* | Optional | An error message for an appropriate validation parameter.
min: string \| ExtendedMsgFn\*\* | Optional | An error message for an appropriate validation parameter. 
minlength: string \| ExtendedMsgFn\*\* | Optional | An error message for an appropriate validation parameter.
pattern: string \| MsgFn\* | Optional | An error message for an appropriate validation parameter.
required: string \| MsgFn\* | Optional | An error message for an appropriate validation parameter.

> \* A function that returns an error message dynamically, depending on `placeholder` valaue.
>```typescript 
> type MsgFn = (placeholder: string) => string;
>```

> \*\* A function that returns an error message dynamically, depending on `placeholder` and a maximum allowed value.
>```typescript 
> type ExtendedMsgFn = (placeholder: string, allowedValue: number) => string;
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
      // color to highlight <g-msg> and <label> elements when an input is invalid
      error?: string;
      // color to highlight <g-msg> element when max length was reached
      maxlength?: string;
    };
    // Position to show a message
    position?: 'bottom-left' | 'bottom-right';
    // Message texts
    msg?: {
      email?: string | MsgFn;
      integer?: string | MsgFn;
      max?: string | ExtendedMsgFn;
      min?: string | ExtendedMsgFn;
      maxlength?: string | ExtendedMsgFn;
      minlength?: string | ExtendedMsgFn;
      pattern?: string | MsgFn;
      required?: string | MsgFn;
    };
  }
```
> Tip: set default messages by `set()` method to provide them to all `<g-msg>` components of the application. If a specific message is not provided to `<g-msg>` component, a default message is used instead. You could also use default messages from the box. See the default config below.

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