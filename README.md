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

2. Import `InputMsgModule` to your feature module as any other Angular module as usual.

3. Inside a `<form>` element, add `gInput` directive to an input element, then append `<g-msg>` component to show error messages. See [Demo](https://ygazhala.github.io/input-msg)

## API Reference


### **InputDirective**

Directive to validate an `<input>` or `<textarea>` element. It is also toggles `g-input_invalid` CSS class when an input status changes.

**Selector:** `gInput` 

**@Input() Properties**

Name | Supported `<input type="">` | Required | Reacts on changes | Description
--- | --- | --- | --- | ---
id: *string* | all\* | Optional | false | Used to connect an input element with `<label>` element.
integer: *boolean* | number | Optional | true | Checks if an input value is an integer
label: *string* | all\* | Optional | true | An input label. Used to be shown inside an error message.
max: *number* \| *string* | number | Optional | true | Checks if an input value does not exceed `max` value.
maxlength: *number* \| *string* | text, password | Optional | true | Checks if an input value length does't exceed `maxlength` value.
min: *number* \| *string* | number | Optional | true | Checks if an input value is not less than `min` value.
minlength: *number* \| *string* | text, password | Optional | true | Checks if an input value length is more than `minlength` value.
model: *NgModel* | all\* | Required | -- | An input model.
name: *string* | all\* | Required | false |  Used to bind an input element with `NgForm` and `<g-msg>` component.
pattern: *RegExp* | text, password | Optional | true | Checks if an input value matches with `pattern`
placeholder: *string* | all\* | Optional | true | An alias for `label` property. Used to be shown inside an error message.
required: *boolean* | all\* | Optional | true | Checks if an input value is not empty. 
type: *string* | all\* | Required | false | Used to apply compatible validators. Supported Input Types: 'text', 'email', 'number' or 'password'. If 'email' type is set - input value would be validated as an email address.

> all\* means 'email', 'text', 'password' and 'number' types.  

### **LabelDirective**

Highlights `<label>` element when a bound input is invalid.

**Selector:** `gLabel` 

**@Input() Properties**

Name | Required | Description
--- | --- | ---
for: string | Required | An input `name` or `id` value. Used to connect `<label>` element with an input element. 


### **MsgComponent**

Displays a message for an input element depending on it`s validation status. Only one message can be shown at a time.

**Selector:** `g-msg` 

**@Input() Properties**

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
    position?: 'bottom-left' | 'bottom-right';
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