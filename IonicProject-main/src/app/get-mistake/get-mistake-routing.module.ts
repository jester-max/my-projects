import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetMistakePage } from './get-mistake.page';

const routes: Routes = [
  {
    path: '',
    component: GetMistakePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GetMistakePageRoutingModule {}
