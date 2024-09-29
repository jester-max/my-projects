import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserBoxItemsPageRoutingModule } from './user-box-items-routing.module';

import { UserBoxItemsPage } from './user-box-items.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserBoxItemsPageRoutingModule
  ],
  declarations: [UserBoxItemsPage]
})
export class UserBoxItemsPageModule {}
