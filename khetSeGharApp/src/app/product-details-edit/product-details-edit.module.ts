import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductDetailsEditPageRoutingModule } from './product-details-edit-routing.module';

import { ProductDetailsEditPage } from './product-details-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductDetailsEditPageRoutingModule
  ],
  declarations: [ProductDetailsEditPage]
})
export class ProductDetailsEditPageModule {}
