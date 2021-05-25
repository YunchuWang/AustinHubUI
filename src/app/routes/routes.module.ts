import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
// dashboard pages
import { DashboardComponent } from './dashboard/dashboard.component';
// single pages
// passport pages
import { RouteRoutingModule } from './routes-routing.module';
import { LayoutModule } from '../layout/layout.module';
import { AccountModule } from './account/account.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

const COMPONENTS: Type<void>[] = [DashboardComponent];

@NgModule({
  imports: [SharedModule, RouteRoutingModule, LayoutModule, AccountModule, MDBBootstrapModule],
  declarations: COMPONENTS,
})
export class RoutesModule {}
