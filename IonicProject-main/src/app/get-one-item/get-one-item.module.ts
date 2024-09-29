import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GetOneItemPageRoutingModule } from './get-one-item-routing.module';

import { GetOneItemPage } from './get-one-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GetOneItemPageRoutingModule
  ],
  declarations: [GetOneItemPage]
})
export class GetOneItemPageModule {}
