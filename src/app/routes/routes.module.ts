import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
// dashboard pages
import { DashboardComponent } from './dashboard/dashboard.component';
// single pages
// passport pages
import { RouteRoutingModule } from './routes-routing.module';

const COMPONENTS: Type<void>[] = [DashboardComponent];

@NgModule({
  imports: [SharedModule, RouteRoutingModule],
  declarations: COMPONENTS,
})
export class RoutesModule {}
