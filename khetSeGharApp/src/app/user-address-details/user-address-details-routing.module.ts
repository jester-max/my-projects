import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserAddressDetailsPage } from './user-address-details.page';

const routes: Routes = [
  {
    path: '',
    component: UserAddressDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserAddressDetailsPageRoutingModule {}
