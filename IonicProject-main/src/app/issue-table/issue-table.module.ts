import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IssueTablePageRoutingModule } from './issue-table-routing.module';

import { IssueTablePage } from './issue-table.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IssueTablePageRoutingModule
  ],
  declarations: [IssueTablePage]
})
export class IssueTablePageModule {}
