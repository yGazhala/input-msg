import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { MatButtonModule, MatInputModule, MatTabsModule } from '@angular/material';

/**
 * Highlights code snippets in html
 * @see https://www.npmjs.com/package/angular2-highlight-js
 */
import { HighlightJsModule } from 'angular2-highlight-js';

import { InputMsgModule } from './input-msg/input-msg.module';

import { AppComponent } from './app.component';
import { DemoComponent } from './demo/demo.component';

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
    MatTabsModule
  ],
  declarations: [
    AppComponent,
    DemoComponent
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
