import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserBoxPage } from './user-box.page';

const routes: Routes = [
  {
    path: '',
    component: UserBoxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserBoxPageRoutingModule {}
