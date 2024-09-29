import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetOneItemPage } from './get-one-item.page';

const routes: Routes = [
  {
    path: '',
    component: GetOneItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GetOneItemPageRoutingModule {}
