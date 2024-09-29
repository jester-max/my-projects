import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateJumboBoxPageRoutingModule } from './create-jumbo-box-routing.module';

import { CreateJumboBoxPage } from './create-jumbo-box.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateJumboBoxPageRoutingModule
  ],
  declarations: [CreateJumboBoxPage]
})
export class CreateJumboBoxPageModule {}
