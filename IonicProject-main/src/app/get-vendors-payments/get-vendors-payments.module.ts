import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GetVendorsPaymentsPageRoutingModule } from './get-vendors-payments-routing.module';

import { GetVendorsPaymentsPage } from './get-vendors-payments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GetVendorsPaymentsPageRoutingModule
  ],
  declarations: [GetVendorsPaymentsPage]
})
export class GetVendorsPaymentsPageModule {}
