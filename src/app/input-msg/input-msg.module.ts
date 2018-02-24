import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputMsgService } from './input-msg.service';
import { InputStorageService } from './input-storage.service';

import { InputDirective } from './input/input.directive';
import { LabelDirective } from './label/label.directive';
import { MsgComponent } from './msg/msg.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    InputDirective,
    LabelDirective,
    MsgComponent
  ],
  providers: [
    InputMsgService,
    InputStorageService
  ],
  exports: [
    InputDirective,
    LabelDirective,
    MsgComponent
  ]
})

export class InputMsgModule { }
