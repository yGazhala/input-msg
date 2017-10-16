import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'g-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public user = {
    email: '',
    name: ''
  };

  public onSubmit(form: NgForm): void {
    if (form.invalid || form.pristine) {
      return;
    }
    console.log(form);
  }

}
