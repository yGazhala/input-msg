import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'g-custom-demo',
  templateUrl: './custom-demo.component.html',
  styleUrls: ['./custom-demo.component.scss']
})
export class CustomDemoComponent {

  public data = {
    email: '',
    name: '',
    quantity: undefined,
    comment: ''
  };

  public onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    console.log(this.data);
    alert(
      `Form has been submitted:
        name: ${this.data.name},
        email: ${this.data.email},
        quantity: ${this.data.quantity},
        comment: ${this.data.comment}
    `);
  }

}
