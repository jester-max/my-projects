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
import {RootComponent} from "./configured/root/root.component";
import {PanelComponent} from "./configured/panel/panel.component";
import {CreateComponent} from "./configured/create/create.component";
import {DisplayComponent} from "./configured/display/display.component";

const routes: Routes = [
  {path:'',component:HomePageComponent},
  {path:'select-service/:_accessToken',component:SelectServiceComponent},
  {path:'sign-up',component:SignUpVerificationComponent},
  {path:'sign-up-contact-info/:_tenantId',component:SignUpContactInfoComponent},
  {path:'sign-up-billing-info',component:SignUpBillingInfoComponent},
  {path:'sign-in-root-user',component:SignInRootUserComponent},
  {path:'sign-in-user',component:SignInUserComponent},

  {path:'config-dashboard',component:ConfigDashboardComponent,
  children:[{path:'custome-dashboard/:_id',component:CustomeDashboardComponent}]},
  {path:'preview-dashboard',component:PreviewDashboardComponent},

  {path:'root/:token',component:RootComponent,
  children:[{path:'panel/:id',component:PanelComponent,
  children:[{path:'create/:id',component:CreateComponent},
            {path:'display/:id',component:DisplayComponent}]},]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

