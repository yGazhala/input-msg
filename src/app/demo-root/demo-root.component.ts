import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { demoComponent, demoTemplate, demoScss } from '../material-demo/code-samle';

@Component({
  selector: 'g-demo-root',
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

    this.material = this.activatedRoute.snapshot.url[0].path === 'material';

    this.componentSample = demoComponent;
    this.styleSample = demoScss;
    this.templateSample = this.sanitizer.bypassSecurityTrustHtml(demoTemplate);
  }

}
