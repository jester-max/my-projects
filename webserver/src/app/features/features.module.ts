import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login-component/login.component';
import { SignupComponentComponent } from './signup/signup-component/signup-component.component';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {ApiService} from "./login/login.service";
import { ProduceBoxComponent } from './produce-boxes/produce-box/produce-box.component';
import { TestimonialComponent } from './review&ratings/testimonial/testimonial.component';
import {CoreModule} from "../core/core.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import {SharedModule} from "../shared/shared.module";
import { ProductCustomizeComponent } from './produce-boxes/product-customize/product-customize.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { CheckoutComponent } from './checkout/checkout.component';
import {AdminLoginComponent} from "./admin/login/login.component";
import { SubPlanComponentComponent } from './subscription/sub-plan-component/sub-plan-component.component';
import {AdminDashboardService} from "./admin/dashboard/admin-dashboard-service";
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { HeaderComponent } from './admin/header/header.component';
import {NgxEchartsDirective, provideEcharts} from "ngx-echarts";
import { PurchaseComponent } from './admin/purchase/purchase.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { FarmerProductsComponent } from './admin/farmer-products/farmer-products.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatIconModule} from "@angular/material/icon";
import { EditProductComponent } from './produce-boxes/edit-product/edit-product.component';
import { OrdersComponent } from './orders/orders.component';
import { UserBoxesComponent } from './user-boxes/user-boxes.component';
import { PurchaseRequestComponent } from './admin/purchase-request/purchase-request.component';
import { UsersBoxesComponent } from './admin/users-boxes/users-boxes.component';
import {AgGridAngular} from "ag-grid-angular";



@NgModule({
  declarations: [
    LoginComponent,
    SignupComponentComponent,
    ProduceBoxComponent,
    TestimonialComponent,
    DashboardComponent,
    ProductCustomizeComponent,
    AppLayoutComponent,
    CheckoutComponent,
    AdminLoginComponent,
    SubPlanComponentComponent,
    AdminProfileComponent,
    AdminLayoutComponent,
    SidebarComponent,
    HeaderComponent,
    PurchaseComponent,
    FarmerProductsComponent,
    EditProductComponent,
    OrdersComponent,
    UserBoxesComponent,
    PurchaseRequestComponent,
    UsersBoxesComponent,
  ],
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    CoreModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    NgxEchartsDirective,
    RouterLinkActive,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatIconModule,
    AgGridAngular
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [],
  providers: [ApiService, AdminDashboardService],
})
export class FeaturesModule {}
