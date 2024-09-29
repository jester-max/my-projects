import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserAddressDetailsPageRoutingModule } from './user-address-details-routing.module';

import { UserAddressDetailsPage } from './user-address-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserAddressDetailsPageRoutingModule
  ],
  declarations: [UserAddressDetailsPage]
})
export class UserAddressDetailsPageModule {}
