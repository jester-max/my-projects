import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateBucketPageRoutingModule } from './create-bucket-routing.module';

import { CreateBucketPage } from './create-bucket.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateBucketPageRoutingModule
  ],
  declarations: [CreateBucketPage]
})
export class CreateBucketPageModule {}
