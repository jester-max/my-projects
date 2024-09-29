import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserBoxItemsPage } from './user-box-items.page';

const routes: Routes = [
  {
    path: '',
    component: UserBoxItemsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserBoxItemsPageRoutingModule {}
