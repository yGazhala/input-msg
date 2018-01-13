import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'g-material-demo',
  templateUrl: './material-demo.component.html',
  styleUrls: ['./material-demo.component.scss']
})
export class MaterialDemoComponent {

  public data = {
    email: '',
    name: '',
    quantity: undefined,
    zipCode: '',
    address: ''
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
        zipCode: ${this.data.zipCode},
        address: ${this.data.address}
    `);
  }

}
