import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddressVerifyPage } from './address-verify.page';

const routes: Routes = [
  {
    path: '',
    component: AddressVerifyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddressVerifyPageRoutingModule {}
