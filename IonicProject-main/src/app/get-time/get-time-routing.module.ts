import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetTimePage } from './get-time.page';

const routes: Routes = [
  {
    path: '',
    component: GetTimePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GetTimePageRoutingModule {}
