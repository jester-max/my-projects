import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  {
    path: 'folder/:userId/:barcodeNum',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'scanner',
    loadChildren: () => import('./scanner/scanner.module').then( m => m.ScannerPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'issue',
    loadChildren: () => import('./issue-product/issue-product.module').then( m => m.IssueProductPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./sign-in-page/sign-in-page.module').then( m => m.SignInPagePageModule),
    canActivate:[AuthGuard]
  },
  {
    path: '',
    loadChildren: () => import('./home-page/home-page.module').then( m => m.HomePagePageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'issue-table/:Id',
    loadChildren: () => import('./issue-table/issue-table.module').then( m => m.IssueTablePageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'get-mistake',
    loadChildren: () => import('./get-mistake/get-mistake.module').then( m => m.GetMistakePageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'create-mistake',
    loadChildren: () => import('./create-mistake/create-mistake.module').then( m => m.CreateMistakePageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'update-mistake',
    loadChildren: () => import('./update-mistake/update-mistake.module').then( m => m.UpdateMistakePageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'test',
    loadChildren: () => import('./test/test.module').then( m => m.TestPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'get-waste',
    loadChildren: () => import('./get-waste/get-waste.module').then( m => m.GetWastePageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'create-waste',
    loadChildren: () => import('./create-waste/create-waste.module').then( m => m.CreateWastePageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'update-waste',
    loadChildren: () => import('./update-waste/update-waste.module').then( m => m.UpdateWastePageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'create-issue',
    loadChildren: () => import('./create-issue/create-issue.module').then( m => m.CreateIssuePageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'details-issue',
    loadChildren: () => import('./details-issue/details-issue.module').then( m => m.DetailsIssuePageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'get-item',
    loadChildren: () => import('./get-item/get-item.module').then( m => m.GetItemPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'create-item',
    loadChildren: () => import('./create-item/create-item.module').then( m => m.CreateItemPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'create-time',
    loadChildren: () => import('./create-time/create-time.module').then( m => m.CreateTimePageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'get-time',
    loadChildren: () => import('./get-time/get-time.module').then( m => m.GetTimePageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'notifications/:where',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'help',
    loadChildren: () => import('./help-center/help-center.module').then( m => m.HelpCenterPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'get-one-item/:itemId',
    loadChildren: () => import('./get-one-item/get-one-item.module').then( m => m.GetOneItemPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'get-one-issue/:issueId',
    loadChildren: () => import('./get-one-issue/get-one-issue.module').then( m => m.GetOneIssuePageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'get-raw-materials',
    loadChildren: () => import('./get-raw-materials/get-raw-materials.module').then( m => m.GetRawMaterialsPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'get-tools',
    loadChildren: () => import('./get-tools/get-tools.module').then( m => m.GetToolsPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'get-payments',
    loadChildren: () => import('./get-payments/get-payments.module').then( m => m.GetPaymentsPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'get-payments/get-vendors-payments',
    loadChildren: () => import('./get-vendors-payments/get-vendors-payments.module').then( m => m.GetVendorsPaymentsPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'sidenav',
    loadChildren: () => import('./sidenav/sidenav.module').then( m => m.SidenavPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
