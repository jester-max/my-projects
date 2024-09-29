import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetItemPage } from './get-item.page';

const routes: Routes = [
  {
    path: '',
    component: GetItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GetItemPageRoutingModule {}
