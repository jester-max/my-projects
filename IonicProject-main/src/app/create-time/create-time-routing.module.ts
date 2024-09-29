import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateTimePage } from './create-time.page';

const routes: Routes = [
  {
    path: '',
    component: CreateTimePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateTimePageRoutingModule {}
