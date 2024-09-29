import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateMistakePage } from './create-mistake.page';

const routes: Routes = [
  {
    path: '',
    component: CreateMistakePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateMistakePageRoutingModule {}
