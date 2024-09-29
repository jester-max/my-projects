import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddressVerifyPageRoutingModule } from './address-verify-routing.module';

import { AddressVerifyPage } from './address-verify.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AddressVerifyPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [AddressVerifyPage]
})
export class AddressVerifyPageModule {}
