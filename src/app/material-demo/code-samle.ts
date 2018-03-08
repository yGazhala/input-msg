let template = `
  <form class="form"
        #form="ngForm"
        novalidate
        (ngSubmit)="onSubmit(form)"
    >

    <h2>Demo Form</h2>

    <div class="form-field-wrap">

      <p class="form-field-desc">
        1) Text input. Validation params: required, minlength=2, maxlength=10.
      </p>

      <mat-form-field>
        <input type="text"
               matInput
               name="userName"
               placeholder="Name"
               [(ngModel)]="data.name"
               #nameModel="ngModel"
               gInput
               [model]="nameModel"
               required
               minlength="2"
               maxlength="10"
          >
      </mat-form-field>

      <g-msg for="userName"></g-msg>

    </div>

    <div class="form-field-wrap">

      <p class="form-field-desc">
        2) Email input. Validation params: required.
      </p>

      <mat-form-field>
        <input type="email"
               matInput
               name="email"
               placeholder="Email"
               [(ngModel)]="data.email"
               #emailModel="ngModel"
               gInput
               [model]="emailModel"
               required
          >
      </mat-form-field>

      <g-msg for="email"></g-msg>

    </div>

    <div class="form-field-wrap">

      <p class="form-field-desc">
        3) Password input. Validation params: required, minlength=6, pattern.
      </p>

      <mat-form-field>
        <input type="password"
               matInput
               placeholder="Password"
               [(ngModel)]="data.password"
               name="password"
               #passwordModel="ngModel"
               gInput
               [model]="passwordModel"
               required
               minlength="6"
               [pattern]="passwordRegExp"
          >
      </mat-form-field>

      <g-msg for="password" [pattern]="weakPasswordMsg"></g-msg>

    </div>

    <div class="form-field-wrap">

      <p class="form-field-desc">
        4) Number input. Validation params: integer, min=1, max=100.
      </p>

      <mat-form-field>
        <input type="number"
               matInput
               name="quantity"
               placeholder="Quantity"
               [(ngModel)]="data.quantity"
               #quantityModel="ngModel"
               gInput
               [model]="quantityModel"
               required
               integer
               min="1" max="100"
          >
      </mat-form-field>

      <g-msg for="quantity"></g-msg>

    </div>

    <div class="form-field-wrap">

      <p class="form-field-desc">
        5) Text area. Validation params: required, maxlength="20".
      </p>

      <mat-form-field>
        <textarea rows="1"
                  matInput
                  name="comment"
                  placeholder="Comment"
                  gInput
                  [(ngModel)]="data.comment"
                  #commentModel="ngModel"
                  [model]="commentModel"
                  required
                  maxlength="20"
          >
        </textarea>
      </mat-form-field>

      <g-msg for="comment"></g-msg>

    </div>

    <div class="form-footer">

      <button type="submit" mat-raised-button color="primary">
        Submit
      </button>

    </div>

  </form>`;

template = template.replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const demoTemplate = `
  <pre>
    <code class="html highlight">${template}</code>
  </pre>`;

export const demoComponent = `
  <pre>
    <code class="typescript highlight">
      import { Component } from '@angular/core';
      import { NgForm } from '@angular/forms';

      @Component({
        selector: 'g-demo',
        templateUrl: './demo.component.html',
        styleUrls: ['./demo.component.scss']
      })
      export class DemoComponent {

        public data = {
          email: '',
          name: '',
          password: '',
          quantity: undefined,
          comment: ''
        };
        public passwordRegExp: RegExp = /(?=.*\d)(?=.*[a-z])/i;
        public weakPasswordMsg = 'Must contain numbers and letters';

        public onSubmit(form: NgForm): void {
          if (form.invalid) {
            return;
          }
          console.log(this.data);
        }
      }
    </code>
  </pre>`;

export const demoScss = `
  <pre>
    <code class="scss highlight">
      .form {
        h2 {
          margin-bottom: 40px;
        }
        &-field-wrap {
          margin-bottom: 30px;
        }
        &-field-desc {
          color: #3f51b5;
          font-size: 14px;
        }
        &-footer {
          margin-top: 10px;
          display: flex;
          justify-content: flex-end;
        }
      }
    </code>
  </pre>`;
