import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { demoComponent, demoTemplate, demoScss } from './demo/code-samle';

@Component({
  selector: 'g-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public componentSample: string;
  public styleSample: string;
  public templateSample: SafeHtml;

  constructor(private sanitizer: DomSanitizer) { }

  public ngOnInit(): void {
    this.componentSample = demoComponent;
    this.styleSample = demoScss;
    this.templateSample = this.sanitizer.bypassSecurityTrustHtml(demoTemplate);
  }

}
