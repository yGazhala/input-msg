import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'g-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public data = {
    email: '',
    name: '',
    quantity: undefined
  };

  public readonly componentSample = `
    <pre>
      <code class="typescript highlight">
      import { Component } from '@angular/core';
      import { NgForm } from '@angular/forms';

      @Component({
        selector: 'g-app',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.scss']
      })
      export class AppComponent {

        public data = {
          email: '',
          name: '',
          quantity: undefined
        };

        public onSubmit(form: NgForm): void {
          if (form.invalid) {
            return;
          }
          console.log(this.data);
        }
      }
      </code>
    </pre>`;

  constructor(private sanitizer: DomSanitizer) { }

  public ngOnInit(): void {
  }

  public onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    console.log(this.data);
  }

}
