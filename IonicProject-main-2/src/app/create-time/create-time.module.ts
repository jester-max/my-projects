import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateTimePageRoutingModule } from './create-time-routing.module';

import { CreateTimePage } from './create-time.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateTimePageRoutingModule
  ],
  declarations: [CreateTimePage]
})
export class CreateTimePageModule {}
