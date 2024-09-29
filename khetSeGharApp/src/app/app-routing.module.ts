import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./auth/auth.guard";

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate:[AuthGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'home-panel',
    pathMatch: 'full'
  },
  {
    path: 'signup',
    loadChildren: () => import('./auth/signup/signup.module').then( m => m.SignupPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'home-panel',
    loadChildren: () => import('./home-panel/home-panel.module').then( m => m.HomePanelPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'verify-user/:contact',
    loadChildren: () => import('./auth/verify-user/verify-user.module').then( m => m.VerifyUserPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'product-details',
    loadChildren: () => import('./product-details/product-details.module').then( m => m.ProductDetailsPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'create-bucket-regular',
    loadChildren: () => import('./create-bucket/create-bucket.module').then( m => m.CreateBucketPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'create-jumbo-box',
    loadChildren: () => import('./create-jumbo-box/create-jumbo-box.module').then( m => m.CreateJumboBoxPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'select-box-size',
    loadChildren: () => import('./select-box-size/select-box-size.module').then( m => m.SelectBoxSizePageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./user-profile/user-profile.module').then( m => m.UserProfilePageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'address-verify',
    loadChildren: () => import('./auth/address-verify/address-verify.module').then( m => m.AddressVerifyPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'product-details-edit/:id',
    loadChildren: () => import('./product-details-edit/product-details-edit.module').then( m => m.ProductDetailsEditPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'payment',
    loadChildren: () => import('./payment/payment.module').then( m => m.PaymentPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then(m => m.OrdersPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'order-details/:id',
    loadChildren: () => import('./order-details/order-details.module').then( m => m.OrderDetailsPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'user-address-details',
    loadChildren: () => import('./user-address-details/user-address-details.module').then( m => m.UserAddressDetailsPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'user-box/:id',
    loadChildren: () => import('./user-box/user-box.module').then( m => m.UserBoxPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'user-box-items/:id',
    loadChildren: () => import('./user-box-items/user-box-items.module').then( m => m.UserBoxItemsPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'example',
    loadChildren: () => import('./example/example.module').then( m => m.ExamplePageModule),
    canLoad: [AuthGuard],
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
