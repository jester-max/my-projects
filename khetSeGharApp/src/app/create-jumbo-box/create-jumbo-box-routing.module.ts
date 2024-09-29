import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateJumboBoxPage } from './create-jumbo-box.page';

const routes: Routes = [
  {
    path: '',
    component: CreateJumboBoxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateJumboBoxPageRoutingModule {}
