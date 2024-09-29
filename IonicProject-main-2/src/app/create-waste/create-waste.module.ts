import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateWastePageRoutingModule } from './create-waste-routing.module';

import { CreateWastePage } from './create-waste.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateWastePageRoutingModule
  ],
  declarations: [CreateWastePage]
})
export class CreateWastePageModule {}
