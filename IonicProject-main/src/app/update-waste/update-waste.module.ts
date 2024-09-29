import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateWastePageRoutingModule } from './update-waste-routing.module';

import { UpdateWastePage } from './update-waste.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateWastePageRoutingModule
  ],
  declarations: [UpdateWastePage]
})
export class UpdateWastePageModule {}
