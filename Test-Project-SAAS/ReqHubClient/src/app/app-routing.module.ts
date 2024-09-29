import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./landingPage/home-page/home-page.component";
import {SignUpVerificationComponent} from "./signUp/sign-up-verification/sign-up-verification.component";
import {SignUpContactInfoComponent} from "./signUp/sign-up-contact-info/sign-up-contact-info.component";
import {SignUpBillingInfoComponent} from "./signUp/sign-up-billing-info/sign-up-billing-info.component";
import {SignInRootUserComponent} from "./signIn/sign-in-root-user/sign-in-root-user.component";
import {SignInUserComponent} from "./signIn/sign-in-user/sign-in-user.component";
import {SelectServiceComponent} from "./landingPage/select-service/select-service.component";
import {ConfigDashboardComponent} from "./configuration/config-dashboard/config-dashboard.component";
import {PreviewDashboardComponent} from "./configuration/preview-dashboard/preview-dashboard.component";
import {CustomeDashboardComponent} from "./configuration/custome-dashboard/custome-dashboard.component";
import {ConfigTableComponent} from "./configuration/config-table/config-table.component";

const routes: Routes = [
  {path:'',component:HomePageComponent},
  {path:'select-service/:_accessToken',component:SelectServiceComponent},
  {path:'sign-up',component:SignUpVerificationComponent},
  {path:'sign-up-contact-info/:_tenantId',component:SignUpContactInfoComponent},
  {path:'sign-up-billing-info',component:SignUpBillingInfoComponent},
  {path:'sign-in-root-user',component:SignInRootUserComponent},
  {path:'sign-in-user',component:SignInUserComponent},

  {path:'config-dashboard',component:ConfigDashboardComponent,
  children:[{path:'custom-dashboard/:_id',component:CustomeDashboardComponent},
            {path:'custom-table/:_id',component:ConfigTableComponent}]},
  {path:'preview-dashboard',component:PreviewDashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
