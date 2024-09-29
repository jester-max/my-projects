import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetRawMaterialsPage } from './get-raw-materials.page';

const routes: Routes = [
  {
    path: '',
    component: GetRawMaterialsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GetRawMaterialsPageRoutingModule {}
