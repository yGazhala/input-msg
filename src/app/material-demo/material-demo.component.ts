import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'ngx-material-demo',
  templateUrl: './material-demo.component.html',
  styleUrls: ['./material-demo.component.scss']
})
export class MaterialDemoComponent {

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
    alert(
      `Form has been submitted:
        name: ${this.data.name},
        email: ${this.data.email},
        password: ${this.data.password},
        quantity: ${this.data.quantity},
        comment: ${this.data.comment}
    `);
  }

}
