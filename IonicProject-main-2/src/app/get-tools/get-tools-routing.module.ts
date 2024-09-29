import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetToolsPage } from './get-tools.page';

const routes: Routes = [
  {
    path: '',
    component: GetToolsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GetToolsPageRoutingModule {}
