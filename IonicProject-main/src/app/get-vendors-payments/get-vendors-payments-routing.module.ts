import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetVendorsPaymentsPage } from './get-vendors-payments.page';

const routes: Routes = [
  {
    path: '',
    component: GetVendorsPaymentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GetVendorsPaymentsPageRoutingModule {}
