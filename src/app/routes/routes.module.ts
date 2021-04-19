import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {MainLayoutComponent} from "../layout/main-layout/main-layout.component";
import {LayoutModule} from "../layout/layout.module";

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    // canActivate: [SimpleGuard],
    // children: [
    //   { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    //   { path: 'dashboard', component: DashboardComponent, data: { title: '仪表盘' } },
    //   { path: 'exception', loadChildren: () => import('./exception/exception.module').then((m) => m.ExceptionModule) },
    // ],
  },
  // {
  //   path: 'auth',
  //   component: LayoutPassportComponent,
  //   loadChildren: () => import('./account-management/account-management.module').then((m) => m.AccountManagementModule),
  // }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LayoutModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class RoutesModule { }
