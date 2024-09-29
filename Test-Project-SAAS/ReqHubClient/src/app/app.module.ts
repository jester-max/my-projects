import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpVerificationComponent } from './signUp/sign-up-verification/sign-up-verification.component';
import { SignUpContactInfoComponent } from './signUp/sign-up-contact-info/sign-up-contact-info.component';
import { SignUpBillingInfoComponent } from './signUp/sign-up-billing-info/sign-up-billing-info.component';
import { SignInRootUserComponent } from './signIn/sign-in-root-user/sign-in-root-user.component';
import { SignInUserComponent } from './signIn/sign-in-user/sign-in-user.component';
import { HomePageComponent } from './landingPage/home-page/home-page.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { SelectServiceComponent } from './landingPage/select-service/select-service.component';
import { ConfigDashboardComponent } from './configuration/config-dashboard/config-dashboard.component';
import { PreviewDashboardComponent } from './configuration/preview-dashboard/preview-dashboard.component';
import { CustomeDashboardComponent } from './configuration/custome-dashboard/custome-dashboard.component';
import { ConfigTableComponent } from './configuration/config-table/config-table.component';


@NgModule({
  declarations: [
    AppComponent,
    SignUpVerificationComponent,
    SignUpContactInfoComponent,
    SignUpBillingInfoComponent,
    SignInRootUserComponent,
    SignInUserComponent,
    HomePageComponent,
    SelectServiceComponent,
    ConfigDashboardComponent,
    PreviewDashboardComponent,
    CustomeDashboardComponent,
    ConfigTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
