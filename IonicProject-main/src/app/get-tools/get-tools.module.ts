import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GetToolsPageRoutingModule } from './get-tools-routing.module';

import { GetToolsPage } from './get-tools.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GetToolsPageRoutingModule
  ],
  declarations: [GetToolsPage]
})
export class GetToolsPageModule {}
