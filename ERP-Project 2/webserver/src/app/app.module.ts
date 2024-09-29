import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SignInComponent } from './sign-in/sign-in.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LandingPageComponent } from './landing-page/landing-page.component'; // Import FormsModule
import {HTTP_INTERCEPTORS, HttpClientModule, HttpErrorResponse} from "@angular/common/http";
import { CustomeTenantComponent } from './custome-tenant/custome-tenant.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';
import { InvoiceComponent } from './invoice/invoice.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MainModulesComponent } from './main-modules/main-modules.component';
import { ConfigModuleComponent } from './config-module/config-module.component';
import {CdkDrag, CdkDropList, DragDropModule} from "@angular/cdk/drag-drop";
import {CustomeDashboardComponent} from "./custome-dashboard/custome-dashboard.component";
import {NgToastModule} from "ng-angular-popup";
import {CookieService} from 'ngx-cookie-service';
import {MatChipsModule} from '@angular/material/chips';
import { PurchaseQuotationComponent } from './dashboard/purchase/purchase-quotation/purchase-quotation.component';
import { PurchaseInvoiceComponent } from './dashboard/purchase/purchase-invoice/purchase-invoice.component';
import { SaleInvoiceComponent } from './dashboard/sale/sale-invoice/sale-invoice.component';
import { SaleTransportComponent } from './dashboard/sale/sale-transport/sale-transport.component';
import { SaleQuotationComponent } from './dashboard/sale/sale-quotation/sale-quotation.component';
import {CustomerComponent} from "./dashboard/customer/customer.component";
import {EmployeeComponent} from "./dashboard/employee/employee.component";
import {NgApexchartsModule} from "ng-apexcharts";
import {ServiceService} from "./service.service";
import { SignUpComponent } from './sign-up/sign-up.component';
import {UpdateComponent} from "./dashboard/update/update.component";
import {CreateComponent} from "./dashboard/create/create.component";
import {DisplayComponent} from "./dashboard/display/display.component";
import {ConfigurationModulesComponent} from "./configuration-modules/configuration-modules.component";

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    LandingPageComponent,
    CustomeTenantComponent,
    InvoiceComponent,
    HomePageComponent,
    MainModulesComponent,
    ConfigModuleComponent,
    CustomeDashboardComponent,
    PurchaseQuotationComponent,
    PurchaseInvoiceComponent,
    SaleInvoiceComponent,
    SaleTransportComponent,
    SaleQuotationComponent,
    CustomerComponent,
    EmployeeComponent,
    SignUpComponent,
    UpdateComponent,
    CreateComponent,
    DisplayComponent,
    ConfigurationModulesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatListModule,
    MatExpansionModule,
    MatSelectModule,
    MatDialogModule,
    MatTableModule,
    MatDividerModule,
    DragDropModule,
    NgToastModule,
    MatChipsModule,
    NgApexchartsModule
  ],
  providers: [CookieService,
    {provide:HTTP_INTERCEPTORS,
    useClass:ServiceService,
    multi:true}],
  bootstrap: [AppComponent]
})

export class AppModule { }
