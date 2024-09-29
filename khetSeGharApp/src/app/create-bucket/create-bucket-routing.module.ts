import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateBucketPage } from './create-bucket.page';

const routes: Routes = [
  {
    path: '',
    component: CreateBucketPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateBucketPageRoutingModule {}
