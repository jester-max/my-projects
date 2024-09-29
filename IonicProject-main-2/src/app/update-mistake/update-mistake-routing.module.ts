import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateMistakePage } from './update-mistake.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateMistakePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateMistakePageRoutingModule {}
