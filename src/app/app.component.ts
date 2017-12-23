import { Component, AfterViewInit, ElementRef } from '@angular/core';

declare const hljs: any;

import { demoComponent, demoScss } from './demo/code-samle';

@Component({
  selector: 'g-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  public readonly componentSample: string = demoComponent;
  public readonly styleSample: string = demoScss;

  constructor(private elem: ElementRef) { }

  public ngAfterViewInit(): void {
    hljs.highlightBlock(this.elem.nativeElement.querySelector('.html'));
  }

}
