import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { demoComponent, demoTemplate, demoScss } from '../material-demo/code-samle';
import { customDemoTemplate, customDemoScss } from '../custom-demo/code-samle';

@Component({
  selector: 'ngx-demo-root',
  templateUrl: './demo-root.component.html',
  styleUrls: ['./demo-root.component.scss']
})
export class DemoRootComponent implements OnInit {

  public componentSample: string;
  public material: boolean;
  public styleSample: string;
  public templateSample: SafeHtml;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }

  public ngOnInit(): void {

    this.componentSample = demoComponent;

    this.material = this.activatedRoute.snapshot.url[0].path === 'material';
    if (this.material) {
      this.styleSample = demoScss;
      this.templateSample = this.sanitizer.bypassSecurityTrustHtml(demoTemplate);
    } else {
      this.styleSample = customDemoScss;
      this.templateSample = this.sanitizer.bypassSecurityTrustHtml(customDemoTemplate);
    }
  }

}
