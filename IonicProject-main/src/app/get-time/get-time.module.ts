import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GetTimePageRoutingModule } from './get-time-routing.module';

import { GetTimePage } from './get-time.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GetTimePageRoutingModule
  ],
  declarations: [GetTimePage]
})
export class GetTimePageModule {}
