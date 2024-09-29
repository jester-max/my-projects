import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GetRawMaterialsPageRoutingModule } from './get-raw-materials-routing.module';

import { GetRawMaterialsPage } from './get-raw-materials.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GetRawMaterialsPageRoutingModule
  ],
  declarations: [GetRawMaterialsPage]
})
export class GetRawMaterialsPageModule {}
