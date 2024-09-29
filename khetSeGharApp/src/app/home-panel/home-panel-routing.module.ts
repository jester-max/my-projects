import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePanelPage } from './home-panel.page';

const routes: Routes = [
  {
    path: '',
    component: HomePanelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePanelPageRoutingModule {}
