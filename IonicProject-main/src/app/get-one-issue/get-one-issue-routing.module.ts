import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetOneIssuePage } from './get-one-issue.page';

const routes: Routes = [
  {
    path: '',
    component: GetOneIssuePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GetOneIssuePageRoutingModule {}
