import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GetItemPageRoutingModule } from './get-item-routing.module';

import { GetItemPage } from './get-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GetItemPageRoutingModule
  ],
  declarations: [GetItemPage]
})
export class GetItemPageModule {}
