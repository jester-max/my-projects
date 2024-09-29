import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductDetailsEditPage } from './product-details-edit.page';

const routes: Routes = [
  {
    path: '',
    component: ProductDetailsEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductDetailsEditPageRoutingModule {}
