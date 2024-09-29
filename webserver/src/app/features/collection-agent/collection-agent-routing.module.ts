import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AgentSignupComponent} from "./agent-signup/agent-signup.component";
import {AgentSigninComponent} from "./agent-signin/agent-signin.component";
import {DashboardComponent} from "./collection-agent-dashboard/dashboard/dashboard.component";
import {ProfileComponent} from "./collection-agent-dashboard/profile/profile.component";
import {ProduceComponent} from "./collection-agent-dashboard/produce/produce.component";
import {AgentHomeComponent} from "./collection-agent-dashboard/agent-home/agent-home.component";
import {CentersComponent} from "./collection-agent-dashboard/centers/centers.component";

const routes: Routes = [
  { path: 'signup', component: AgentSignupComponent },
  { path: 'signing', component: AgentSigninComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'products', component: ProduceComponent },
      { path: 'home', component: AgentHomeComponent },
      { path: 'centers', component: CentersComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionAgentRoutingModule { }
