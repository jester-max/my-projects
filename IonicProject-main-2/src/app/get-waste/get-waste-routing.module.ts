import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetWastePage } from './get-waste.page';

const routes: Routes = [
  {
    path: '',
    component: GetWastePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GetWastePageRoutingModule {}
