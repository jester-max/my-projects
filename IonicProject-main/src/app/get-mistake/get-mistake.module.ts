import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GetMistakePageRoutingModule } from './get-mistake-routing.module';

import { GetMistakePage } from './get-mistake.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GetMistakePageRoutingModule
  ],
  declarations: [GetMistakePage]
})
export class GetMistakePageModule {}
