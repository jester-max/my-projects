import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import {MainComponent} from "./admin/main/main.component";
import {DashboardComponent} from "./admin/dashboard/dashboard.component";
import {UsersPanelComponent} from "./admin/users/users-panel/users-panel.component";
import {ViewUsersComponent} from "./admin/users/view-users/view-users.component";

const routes: Routes = [
  { path: "", component: MainComponent },
  { path: "dash", component: DashboardComponent },

  {path:'users-panel',redirectTo:'users-panel/view-users',pathMatch:"full"},
  {path:'users-panel', component:UsersPanelComponent,
  children:[{ path:"view-users", component:ViewUsersComponent},]}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
