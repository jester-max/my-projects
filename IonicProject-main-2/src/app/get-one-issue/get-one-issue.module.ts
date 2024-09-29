import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GetOneIssuePageRoutingModule } from './get-one-issue-routing.module';

import { GetOneIssuePage } from './get-one-issue.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GetOneIssuePageRoutingModule
  ],
  declarations: [GetOneIssuePage]
})
export class GetOneIssuePageModule {}
