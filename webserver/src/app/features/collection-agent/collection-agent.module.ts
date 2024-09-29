import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectionAgentRoutingModule } from './collection-agent-routing.module';
import { AgentSignupComponent } from './agent-signup/agent-signup.component';
import { AgentSigninComponent } from './agent-signin/agent-signin.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DashboardComponent } from './collection-agent-dashboard/dashboard/dashboard.component';
import { ProfileComponent } from './collection-agent-dashboard/profile/profile.component';
import { ProduceComponent } from './collection-agent-dashboard/produce/produce.component';
import { AgentHomeComponent } from './collection-agent-dashboard/agent-home/agent-home.component';
import { CentersComponent } from './collection-agent-dashboard/centers/centers.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AgentSignupComponent,
    AgentSigninComponent,
    DashboardComponent,
    ProfileComponent,
    ProduceComponent,
    AgentHomeComponent,
    CentersComponent,

  ],
  imports: [
    CommonModule,
    CollectionAgentRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,

  ]
})
export class CollectionAgentModule { }
