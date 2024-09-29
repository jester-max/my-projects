import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectBoxSizePage } from './select-box-size.page';

const routes: Routes = [
  {
    path: '',
    component: SelectBoxSizePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectBoxSizePageRoutingModule {}
