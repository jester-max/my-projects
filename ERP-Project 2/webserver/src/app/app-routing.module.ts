import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignInComponent} from "./sign-in/sign-in.component";
import {AppComponent} from "./app.component";
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {CustomeTenantComponent} from "./custome-tenant/custome-tenant.component";

import {HomePageComponent} from "./home-page/home-page.component";
import {MainModulesComponent} from "./main-modules/main-modules.component";
import {ConfigModuleComponent} from "./config-module/config-module.component";
import {CustomeDashboardComponent} from "./custome-dashboard/custome-dashboard.component";
import {SaleInvoiceComponent} from "./dashboard/sale/sale-invoice/sale-invoice.component";
import {SaleQuotationComponent} from "./dashboard/sale/sale-quotation/sale-quotation.component";
import {SaleTransportComponent} from "./dashboard/sale/sale-transport/sale-transport.component";
import {PurchaseQuotationComponent} from "./dashboard/purchase/purchase-quotation/purchase-quotation.component";
import {PurchaseInvoiceComponent} from "./dashboard/purchase/purchase-invoice/purchase-invoice.component";
import {CustomerComponent} from "./dashboard/customer/customer.component";
import {EmployeeComponent} from "./dashboard/employee/employee.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {CreateComponent} from "./dashboard/create/create.component";
import {UpdateComponent} from "./dashboard/update/update.component";
import {DisplayComponent} from "./dashboard/display/display.component";
import {ConfigurationModulesComponent} from "./configuration-modules/configuration-modules.component";


const routes: Routes = [
  { path: 'main/:_id', component: HomePageComponent },
  { path: '', component: SignInComponent },
  // { path: '', component: SignUpComponent },
  // { path: '', component: MainModulesComponent },
  { path: 'customise/:_id', component: CustomeTenantComponent},
  { path: 'landing-page/:_id', component: LandingPageComponent,
  children:[{ path: '', component: ConfigModuleComponent},
    { path: 'sale-invoice/:_id', component: SaleInvoiceComponent,
      children:[{ path: 'Create/:_id', component: CreateComponent},
        { path: 'Display/:_id', component: DisplayComponent},
        { path: 'Update/:_id', component: UpdateComponent}]},
    { path: 'sale-quotation/:_id', component: SaleQuotationComponent},
    { path: 'sale-transport/:_id', component: SaleTransportComponent},
    { path: 'purchase-quotation/:_id', component: PurchaseQuotationComponent},
    { path: 'purchase-invoice/:_id', component: PurchaseInvoiceComponent},
    { path: 'customer/:_id', component: CustomerComponent},
    { path: 'employee/:_id', component: EmployeeComponent}]},
  { path: 'configurationModule/:_id', component: ConfigurationModulesComponent},
  { path: 'mainModules/:_id', component: CustomeDashboardComponent},
  { path: 'configModules', component: ConfigModuleComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
