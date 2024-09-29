import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IssueProductPage } from './issue-product.page';

const routes: Routes = [
  {
    path: '',
    component: IssueProductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IssueProductPageRoutingModule {}
