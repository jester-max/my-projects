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
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { SelectServiceComponent } from './landingPage/select-service/select-service.component';
import { ConfigDashboardComponent } from './configuration/config-dashboard/config-dashboard.component';
import { PreviewDashboardComponent } from './configuration/preview-dashboard/preview-dashboard.component';
import { CustomeDashboardComponent } from './configuration/custome-dashboard/custome-dashboard.component';
import {AuthService} from "./authService/auth.service";
import { HeaderComponent } from './configuration/header/header.component';
import { SidenavComponent } from './configuration/sidenav/sidenav.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDrawer, MatSidenavModule} from "@angular/material/sidenav";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { RootComponent } from './configured/root/root.component';
import { PanelComponent } from './configured/panel/panel.component';
import { CreateComponent } from './configured/create/create.component';
import {NgForOf, NgIf} from "@angular/common";
import { DisplayComponent } from './configured/display/display.component';

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
    HeaderComponent,
    SidenavComponent,
    RootComponent,
    PanelComponent,
    CreateComponent,
    DisplayComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatMenuModule,
    MatTooltipModule,
    MatListModule,
    MatToolbarModule,
    MatCheckboxModule,
    FormsModule,
  ],
  exports:[BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatMenuModule,
    MatTooltipModule,
    MatListModule,
    MatToolbarModule,
    MatCheckboxModule,
    FormsModule,],
  providers: [{provide:HTTP_INTERCEPTORS,
    useClass:AuthService,
    multi:true}],
  bootstrap: [AppComponent]
})

export class AppModule { }
