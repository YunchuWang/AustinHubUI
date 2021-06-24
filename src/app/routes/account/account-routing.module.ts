import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountInfoComponent } from './info/info.component';
import { AccountMyAdsComponent } from './my-ads/my-ads.component';
import { AccountMyBoothsComponent } from './my-booths/my-booths.component';
import { AccountMyJobsComponent } from './my-jobs/my-jobs.component';
import { OrderHistoryComponent } from './order-history/order-history.component';

const routes: Routes = [
  { path: '', redirectTo: 'info', pathMatch: 'full' },
  { path: 'info', component: AccountInfoComponent },
  { path: 'my-booths', component: AccountMyBoothsComponent },
  { path: 'my-jobs', component: AccountMyJobsComponent },
  { path: 'my-ads', component: AccountMyAdsComponent },
  { path: 'order-history', component: OrderHistoryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
