import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsIssuePageRoutingModule } from './details-issue-routing.module';

import { DetailsIssuePage } from './details-issue.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsIssuePageRoutingModule
  ],
  declarations: [DetailsIssuePage]
})
export class DetailsIssuePageModule {}
