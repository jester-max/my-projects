import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'folder/:userId/:barcodeNum',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'scanner',
    loadChildren: () => import('./scanner/scanner.module').then( m => m.ScannerPageModule)
  },
  {
    path: 'issue',
    loadChildren: () => import('./issue-product/issue-product.module').then( m => m.IssueProductPageModule)
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./sign-in-page/sign-in-page.module').then( m => m.SignInPagePageModule)
  },
  {
    path: '',
    loadChildren: () => import('./home-page/home-page.module').then( m => m.HomePagePageModule)
  },
  {
    path: 'issue-table/:Id',
    loadChildren: () => import('./issue-table/issue-table.module').then( m => m.IssueTablePageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule),
  },
  {
    path: 'get-mistake',
    loadChildren: () => import('./get-mistake/get-mistake.module').then( m => m.GetMistakePageModule)
  },
  {
    path: 'create-mistake',
    loadChildren: () => import('./create-mistake/create-mistake.module').then( m => m.CreateMistakePageModule)
  },
  {
    path: 'update-mistake',
    loadChildren: () => import('./update-mistake/update-mistake.module').then( m => m.UpdateMistakePageModule)
  },
  {
    path: 'test',
    loadChildren: () => import('./test/test.module').then( m => m.TestPageModule)
  },
  {
    path: 'get-waste',
    loadChildren: () => import('./get-waste/get-waste.module').then( m => m.GetWastePageModule)
  },
  {
    path: 'create-waste',
    loadChildren: () => import('./create-waste/create-waste.module').then( m => m.CreateWastePageModule)
  },
  {
    path: 'update-waste',
    loadChildren: () => import('./update-waste/update-waste.module').then( m => m.UpdateWastePageModule)
  },
  {
    path: 'create-issue',
    loadChildren: () => import('./create-issue/create-issue.module').then( m => m.CreateIssuePageModule)
  },
  {
    path: 'details-issue',
    loadChildren: () => import('./details-issue/details-issue.module').then( m => m.DetailsIssuePageModule)
  },
  {
    path: 'get-item',
    loadChildren: () => import('./get-item/get-item.module').then( m => m.GetItemPageModule)
  },
  {
    path: 'create-item',
    loadChildren: () => import('./create-item/create-item.module').then( m => m.CreateItemPageModule)
  },
  {
    path: 'create-time',
    loadChildren: () => import('./create-time/create-time.module').then( m => m.CreateTimePageModule)
  },
  {
    path: 'get-time',
    loadChildren: () => import('./get-time/get-time.module').then( m => m.GetTimePageModule)
  },
  {
    path: 'notifications/:where',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'help',
    loadChildren: () => import('./help-center/help-center.module').then( m => m.HelpCenterPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'get-one-item/:itemId',
    loadChildren: () => import('./get-one-item/get-one-item.module').then( m => m.GetOneItemPageModule)
  },
  {
    path: 'get-one-issue/:issueId',
    loadChildren: () => import('./get-one-issue/get-one-issue.module').then( m => m.GetOneIssuePageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'get-raw-materials',
    loadChildren: () => import('./get-raw-materials/get-raw-materials.module').then( m => m.GetRawMaterialsPageModule)
  },
  {
    path: 'get-tools',
    loadChildren: () => import('./get-tools/get-tools.module').then( m => m.GetToolsPageModule)
  },
  {
    path: 'get-payments',
    loadChildren: () => import('./get-payments/get-payments.module').then( m => m.GetPaymentsPageModule)
  },
  {
    path: 'get-payments/get-vendors-payments',
    loadChildren: () => import('./get-vendors-payments/get-vendors-payments.module').then( m => m.GetVendorsPaymentsPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
