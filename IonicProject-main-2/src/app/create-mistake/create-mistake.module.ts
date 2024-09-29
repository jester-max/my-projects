import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateMistakePageRoutingModule } from './create-mistake-routing.module';

import { CreateMistakePage } from './create-mistake.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateMistakePageRoutingModule
  ],
  declarations: [CreateMistakePage]
})
export class CreateMistakePageModule {}
