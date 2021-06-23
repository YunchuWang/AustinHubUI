import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';

import { FlexModule } from '@angular/flex-layout';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '@shared';
import { CardsModule, IconsModule, TableModule } from 'angular-bootstrap-md';
import { LayoutModule } from '../../layout/layout.module';
import { AccountInfoComponent } from './info/info.component';
import { AccountMyAdsComponent } from './my-ads/my-ads.component';
import { AccountMyBoothsComponent } from './my-booths/my-booths.component';
import { AccountMyJobsComponent } from './my-jobs/my-jobs.component';
import { OrderHistoryComponent } from './order-history/order-history.component';

const COMPONENTS: Type<void>[] = [
  AccountInfoComponent,
  AccountMyBoothsComponent,
  AccountMyJobsComponent,
  AccountMyAdsComponent,
  OrderHistoryComponent,
];

@NgModule({
  declarations: [COMPONENTS, OrderHistoryComponent],
  imports: [
    CommonModule,
    SharedModule,
    LayoutModule,
    TableModule,
    IconsModule,
    CardsModule,
    FlexModule,
    MatButtonToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
  ],
})
export class AccountModule {}
