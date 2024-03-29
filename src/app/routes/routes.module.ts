import { NgModule, Type } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@shared';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { LayoutModule } from '../layout/layout.module';
import { AccountModule } from './account/account.module';
// dashboard pages
import { DashboardComponent } from './dashboard/dashboard.component';
// single pages
// passport pages
import { RouteRoutingModule } from './routes-routing.module';

const COMPONENTS: Type<void>[] = [DashboardComponent];

@NgModule({
  imports: [SharedModule, RouteRoutingModule, LayoutModule, AccountModule, MDBBootstrapModule, TranslateModule],
  declarations: COMPONENTS,
  exports: [TranslateModule],
})
export class RoutesModule {}
