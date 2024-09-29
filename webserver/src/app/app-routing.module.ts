import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./features/login/login-component/login.component";
import {SignupComponentComponent} from "./features/signup/signup-component/signup-component.component";
import {AuthGuard} from "./core/guards/auth.guard";
import {ContentLayoutComponent} from "./core/static-components/content-layout/content-layout.component";
import {HomeComponent} from "./core/static-components/home/home.component";
import {PageNotFoundComponent} from "./core/static-components/page-not-found/page-not-found.component";
import {HeaderTwoComponent} from "./core/static-components/header-two/header-two.component";
import {ProduceBoxComponent} from "./features/produce-boxes/produce-box/produce-box.component";
import {DashboardComponent} from "./features/admin/dashboard/dashboard.component";
import {ProductCustomizeComponent} from "./features/produce-boxes/product-customize/product-customize.component";
import {AppLayoutComponent} from "./features/app-layout/app-layout.component";
import {CheckoutComponent} from "./features/checkout/checkout.component";
import {AdminLoginComponent} from "./features/admin/login/login.component";
import {SubPlanComponentComponent} from "./features/subscription/sub-plan-component/sub-plan-component.component";
import {AdminProfileComponent} from "./features/admin/admin-profile/admin-profile.component";
import {AdminLayoutComponent} from "./features/admin/admin-layout/admin-layout.component";
import {PurchaseComponent} from "./features/admin/purchase/purchase.component";
import {FarmerProductsComponent} from "./features/admin/farmer-products/farmer-products.component";
import {EditProductComponent} from "./features/produce-boxes/edit-product/edit-product.component";
import {OrdersComponent} from "./features/orders/orders.component";
import {UserBoxesComponent} from "./features/user-boxes/user-boxes.component";
import {PurchaseRequestComponent} from "./features/admin/purchase-request/purchase-request.component";
import {UsersBoxesComponent} from "./features/admin/users-boxes/users-boxes.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent, // Default layout with header, call-to-action, and footer
    children: [
      // Other routes here
    ]
  },
  {path: 'action', component: ContentLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      {path:'signup',component:SignupComponentComponent}
    ]
  },
  {path:'choose',component:ContentLayoutComponent,
    children:[
      {path:'main',component:ProduceBoxComponent}
    ]},

  {path:'admin',component:AdminLayoutComponent,
  children:[
     {path:'',pathMatch:'full',redirectTo:'dashboard'},
    {path:'dashboard',component: DashboardComponent},
    {path:'manage-profile',component:AdminProfileComponent},
    {path:'purchase',component:PurchaseComponent},
    {path:'farmers-product',component:FarmerProductsComponent},
    {path:'purchase-request',component:PurchaseRequestComponent},
    {path:'users-boxes',component:UsersBoxesComponent}
  ]
  },

  {path:'admin/login',component:AdminLoginComponent},
  {path:'product',
  component:AppLayoutComponent,
    children:[
      {path:'customize/:product',component:ProductCustomizeComponent},
      {path:'edit/:cartItemID',component:EditProductComponent},
      {path:'checkout',component: CheckoutComponent},
      {path:'subscriptions',component:SubPlanComponentComponent},
      {path:'orders',component:OrdersComponent},
      {path:'user-boxes/:orderId',component:UserBoxesComponent},
    ]
  },
  {
    path: 'collection-center/agent',
    loadChildren: () => import('./features/collection-agent/collection-agent.module').then(m=>m.CollectionAgentModule)
  },
  {path:'**',component:PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
