# InputMsgModule

Provides live form input validation for Angular 2+ projects. Inspired by AngularJS ng-messages module. [Demo:](https://ygazhala.github.io/input-msg)

## Features

- Compatible with Angular Material Design input as well as basic HTML input.

- Based on Angular template driven forms.

- Supports HTML5 validation parameters (required, min, max, minlength, maxlength, email).

- Flexible. You can configure error messages once via InputMsgService and provide them to the entire application or set the specific message to the specific input.

## Get started

1. Add `./src/app/input-msg` folder to your project.

2. Import `InputMsgModule` to your feature module as any other Angular module as usual.

3. Inside a form, add `[gInput]` directive to an input element, then insert `<g-msg>` component to show error messages. See [Demo:](https://ygazhala.github.io/input-msg) 

## Contribution

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.7.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
