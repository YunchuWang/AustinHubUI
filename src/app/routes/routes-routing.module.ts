import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimpleGuard } from '@delon/auth';
import { environment } from '@env/environment';
// layout
import { LayoutPassportComponent } from './../layout/passport/passport.component';
// dashboard pages
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutMainComponent } from '../layout/layout-main/layout-main.component';
import { BoothCardComponent } from '../shared/booth-card/booth-card.component';
import { JobCardComponent } from '../shared/job-card/job-card.component';
import { CategoryType } from '../core/models/CategoryType';

const routes: Routes = [
  {
    // pages with sidebar
    path: '',
    component: LayoutMainComponent,
    data: { hideSideMenu: false, categoryType: CategoryType.RESOURCE },
    // canActivate: [SimpleGuard],
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'booths/:category', component: BoothCardComponent },
      { path: 'jobs/:category', component: JobCardComponent },
    ],
  },
  {
    path: '',
    component: LayoutMainComponent,
    data: { hideSideMenu: true },
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
    data: { hideSideMenu: false, categoryType: CategoryType.ACCOUNT },
    component: LayoutMainComponent,
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
