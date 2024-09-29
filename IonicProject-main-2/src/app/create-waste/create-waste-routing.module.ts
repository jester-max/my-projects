import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateWastePage } from './create-waste.page';

const routes: Routes = [
  {
    path: '',
    component: CreateWastePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateWastePageRoutingModule {}
