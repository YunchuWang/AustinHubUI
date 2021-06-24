import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, CategoryType } from '@core';
import { environment } from '@env/environment';
import { BoothCardComponent, JobCardComponent } from '@shared';
import { LayoutMainComponent } from '../layout/layout-main/layout-main.component';

// layout
import { LayoutPassportComponent } from '../layout/passport/passport.component';
// dashboard pages
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    // pages with sidebar
    path: '',
    component: LayoutMainComponent,
    data: { hideSideMenu: false, categoryType: CategoryType.RESC },
    // canActivate: [SimpleGuard],
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'booths/:category', component: BoothCardComponent },
      { path: 'jobs/:category', component: JobCardComponent },
    ],
  },
  {
    path: 'order',
    component: LayoutMainComponent,
    data: { hideSideMenu: true, categoryType: CategoryType.RESC },
    loadChildren: () => import('./order/order.module').then((m) => m.OrderModule),
  },
  {
    path: 'shopping',
    component: LayoutMainComponent,
    data: { hideSideMenu: true, categoryType: CategoryType.RESC },
    canActivate: [AuthGuard],
    loadChildren: () => import('./shopping/shopping.module').then((m) => m.ShoppingModule),
  },
  {
    // pages without sidebar
    path: 'dashboard',
    component: LayoutMainComponent,
    data: { hideSideMenu: true },
    children: [{ path: '', component: DashboardComponent }],
  },
  {
    path: 'account',
    data: { hideSideMenu: false, categoryType: CategoryType.ACCT },
    component: LayoutMainComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./account/account-routing.module').then((m) => m.AccountRoutingModule),
  },
  {
    // pages without sidebar
    path: 'exception',
    component: LayoutMainComponent,
    data: { hideSideMenu: true },
    loadChildren: () => import('./exception/exception.module').then((m) => m.ExceptionModule),
  },
  {
    path: 'auth',
    component: LayoutPassportComponent,
    loadChildren: () => import('./account-management/account-management.module').then((m) => m.AccountManagementModule),
  },
  // 空白布局
  // {
  //     path: 'blank',
  //     component: LayoutBlankComponent,
  //     children: [
  //     ]
  // },
  // passport
  // 单页不包裹Layout
  // { path: '**', redirectTo: 'exception/404' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: environment.useHash,
      // NOTICE: If you use `reuse-tab` component and turn on keepingScroll you can set to `disabled`
      // Pls refer to https://ng-alain.com/components/reuse-tab
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class RouteRoutingModule {}
