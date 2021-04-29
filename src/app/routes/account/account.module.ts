import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared';
import { LayoutModule } from '../../layout/layout.module';
import { AccountInfoComponent } from './info/info.component';
import { AccountMyBoothsComponent } from './my-booths/my-booths.component';
import { AccountMyJobsComponent } from './my-jobs/my-jobs.component';
import { AccountMyAdsComponent } from './my-ads/my-ads.component';
import { CardsModule, IconsModule, TableModule } from 'angular-bootstrap-md';
import { FlexModule } from '@angular/flex-layout';

const COMPONENTS: Type<void>[] = [AccountInfoComponent, AccountMyBoothsComponent, AccountMyJobsComponent, AccountMyAdsComponent];

@NgModule({
  declarations: [COMPONENTS],
  imports: [CommonModule, SharedModule, LayoutModule, TableModule, IconsModule, CardsModule, FlexModule],
})
export class AccountModule {}
