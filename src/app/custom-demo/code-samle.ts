let template = `
  <form class="form"
        #form="ngForm"
        novalidate
        (ngSubmit)="onSubmit(form)"
    >

    <h2>Demo Form</h2>

    <div class="form-field-wrap">

      <p class="form-field-desc">
        1) Required field with length validation (min = 2, max = 5).
      </p>

      <input class="custom-input"
             type="text"
             gInput
             placeholder="Name"
             [(ngModel)]="data.name"
             name="userName"
             #nameModel="ngModel"
             [model]="nameModel"
             required
             minlength="2"
             maxlength="5"
        >

      <g-msg for="userName"></g-msg>

    </div>

    <div class="form-field-wrap">

      <p class="form-field-desc">
        2) Field with label. Validation params: required and email.
      </p>

      <label class="custom-input-label"
             gLabel for="emailId"
        >Email
      </label>

      <input class="custom-input"
             type="email"
             gInput
             label="Email"
             name="email"
             id="emailId"
             [(ngModel)]="data.email"
             #emailModel="ngModel"
             [model]="emailModel"
             required
        >

      <g-msg for="emailId"></g-msg>

    </div>

    <div class="form-field-wrap">

      <p class="form-field-desc">
        3) Required field with integer and range validation <br>(min = 1, max = 100).
      </p>

      <input class="custom-input"
             type="number"
             gInput
             name="quantity"
             placeholder="Quantity"
             [(ngModel)]="data.quantity"
             #quantityModel="ngModel"
             [model]="quantityModel"
             required
             integer
             min="1" max="100"
        >

      <g-msg for="quantity"></g-msg>

    </div>

    <div class="form-footer">

      <button type="submit">Submit</button>

    </div>

  </form>`;

template = template.replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const customDemoTemplate = `
  <pre>
    <code class="html highlight">${template}</code>
  </pre>`;

export const customDemoScss = `
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
      .custom-input {
        box-sizing: border-box;
        width: 100%;
        padding: 3px 5px;
        border: 1px solid grey;
        border-radius: 4px;
        outline: none;
        transition: border-color 300ms ease;
        &.g-input_invalid {
          border-color: #f44336;
        }
      }
      .custom-input-label {
        font-size: 12px;
        color: grey;
        transition: color 300ms ease;
        &.g-input_invalid {
          color: #f44336;
        }
      }
    </code>
  </pre>`;
