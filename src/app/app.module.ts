import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatInputModule, MatTabsModule } from '@angular/material';

/**
 * Highlights code snippets in html
 * @see https://www.npmjs.com/package/angular2-highlight-js
 */
import { HighlightJsModule } from 'angular2-highlight-js';

import { AppRoutingModule } from './app-routing.module';
import { InputMsgModule } from './input-msg/input-msg.module';

import { AppComponent } from './app.component';
import { CustomDemoComponent } from './custom-demo/custom-demo.component';
import { DemoRootComponent } from './demo-root/demo-root.component';
import { MaterialDemoComponent } from './material-demo/material-demo.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    HighlightJsModule,
    InputMsgModule,
    MatButtonModule,
    MatInputModule,
    MatTabsModule,
    RouterModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    CustomDemoComponent,
    DemoRootComponent,
    MaterialDemoComponent
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
