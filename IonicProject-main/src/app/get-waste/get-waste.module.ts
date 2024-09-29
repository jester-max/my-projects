import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GetWastePageRoutingModule } from './get-waste-routing.module';

import { GetWastePage } from './get-waste.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GetWastePageRoutingModule
  ],
  declarations: [GetWastePage]
})
export class GetWastePageModule {}
