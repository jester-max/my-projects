import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GetPaymentsPageRoutingModule } from './get-payments-routing.module';

import { GetPaymentsPage } from './get-payments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GetPaymentsPageRoutingModule
  ],
  declarations: [GetPaymentsPage]
})
export class GetPaymentsPageModule {}
