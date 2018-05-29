import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputMsgConfigService } from './input-msg-config.service';
import { InputStorageService } from './input-storage.service';

import { InputEmailDirective } from './input-email/input-email.directive';
import { InputNumberDirective } from './input-number/input-number.directive';
import { InputTextDirective } from './input-text/input-text.directive';
import { LabelDirective } from './label/label.directive';
import { MsgComponent } from './msg/msg.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    InputEmailDirective,
    InputNumberDirective,
    InputTextDirective,
    LabelDirective,
    MsgComponent
  ],
  providers: [
    InputMsgConfigService,
    InputStorageService
  ],
  exports: [
    InputEmailDirective,
    InputNumberDirective,
    InputTextDirective,
    LabelDirective,
    MsgComponent
  ]
})

export class InputMsgModule { }
