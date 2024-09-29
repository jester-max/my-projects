import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateIssuePageRoutingModule } from './create-issue-routing.module';

import { CreateIssuePage } from './create-issue.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateIssuePageRoutingModule
  ],
  declarations: [CreateIssuePage]
})
export class CreateIssuePageModule {}
