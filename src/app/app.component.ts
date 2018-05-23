import { Component } from '@angular/core';

@Component({
  selector: 'ngx-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public links = [
    {
      title: 'Material Style',
      path: ['/material']
    },
    {
      title: 'Custom Style',
      path: ['/custom']
    }
  ];

}
