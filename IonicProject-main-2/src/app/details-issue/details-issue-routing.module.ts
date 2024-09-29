import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsIssuePage } from './details-issue.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsIssuePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsIssuePageRoutingModule {}
