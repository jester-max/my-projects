import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserBoxPageRoutingModule } from './user-box-routing.module';

import { UserBoxPage } from './user-box.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserBoxPageRoutingModule
  ],
  declarations: [UserBoxPage]
})
export class UserBoxPageModule {}
