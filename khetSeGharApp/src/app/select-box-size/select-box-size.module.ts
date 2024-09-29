import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectBoxSizePageRoutingModule } from './select-box-size-routing.module';

import { SelectBoxSizePage } from './select-box-size.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectBoxSizePageRoutingModule
  ],
  declarations: [SelectBoxSizePage]
})
export class SelectBoxSizePageModule {}
