# InputMsgModule

Provides live form input validation for Angular 2+ projects. [Demo](https://ygazhala.github.io/input-msg)

This project is inspired by AngularJS ng-messages module.

## Features

- Integrated with Angular template driven forms.

- Easy to add validation through HTML, keeps a component clear from additional form control initializations.

- Supports HTML5 like validation syntax (required, min, max, minlength, maxlength, email, pattern).

- Flexible. You can configure error messages once via InputMsgService and provide them to the entire application or set the specific message to the specific input.

- Compatible with Angular Material Design form-field element as well as basic HTML input.

## Get started

1. Add `./src/app/input-msg` folder to your project.

2. Import `InputMsgModule` to your feature module as any other Angular module as usual.

3. Inside a form, add `gInput` directive to an input element, then append `<g-msg>` component to show error messages. See [Demo](https://ygazhala.github.io/input-msg)

## API Reference

### **InputDirective**

Directive to validate an `<input>` or `<textarea>` element. It is also adds/removes `g-input_invalid` CSS class when the input status changes.

**Selector:** `gInput` 

**Properties**

Name | Supported Input Type | Required | Reacts on changes | Description
--- | --- | --- | --- | ---
`id: string` | all | Optional | false | Used to connect an input element with `<label>` element.
`integer: boolean` | number | Optional | true | Checks if an input value is an integer
`label: string` | all | Optional | true | An input label. Used to be shown inside an error message.
`max: number | string` | number | Optional | true | Checks if an input value does not exceed `max` value.
`maxlength: number | string` | text, password | Optional | true | Checks if an input value length does't exceed `maxlength` value.
`min: number | string` | number | Optional | true | Checks if an input value is not less than `min` value.
`minlength: number | string` | text, password | Optional | true | Checks if an input value length is more than `minlength` value.
`model: NgModel` | all | Required | -- | An input model.
`name: string` | all | Required | false |  Used to bind an input element with `NgForm` and `<g-msg>` component.
`pattern: RegExp` | text, password | Optional | true | Checks if an input value matches with `pattern`
`placeholder: string` | all | Optional | true | An alias for `label` property. Used to be shown inside an error message.
`required: boolean` | all | Optional | true | Checks if an input value is not empty. 
`type: string` | all | Required | false | Used to apply compatible validators. Supported Input Types: `'text' | 'email' | 'number' | 'password'`. If `'email'` type is set - input value would be validated as an email address.


### **LabelDirective**

Highlights `<label>` element when a bound input is invalid.

**Selector:** `gLabel` 

**Properties**

Name | Required | Description
--- | --- | ---
`for: string` | Required | An input `id` value 


### **MsgComponent**

Displays a message for an input element depending on it`s validation status. Only one message can be shown at a time.

**Selector:** `g-msg` 

**Properties**

Name | Required | Description
--- | --- | ---
`for: string` | Required | An input `name` or `id` value. Used to connect `<g-msg>` component with an input element.