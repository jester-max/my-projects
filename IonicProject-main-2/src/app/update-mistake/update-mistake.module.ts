import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateMistakePageRoutingModule } from './update-mistake-routing.module';

import { UpdateMistakePage } from './update-mistake.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateMistakePageRoutingModule
  ],
  declarations: [UpdateMistakePage]
})
export class UpdateMistakePageModule {}
