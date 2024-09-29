import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IssueProductPageRoutingModule } from './issue-product-routing.module';

import { IssueProductPage } from './issue-product.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IssueProductPageRoutingModule
  ],
  declarations: [IssueProductPage]
})
export class IssueProductPageModule {}
