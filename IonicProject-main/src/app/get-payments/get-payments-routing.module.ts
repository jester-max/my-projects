import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetPaymentsPage } from './get-payments.page';

const routes: Routes = [
  {
    path: '',
    component: GetPaymentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GetPaymentsPageRoutingModule {}
