import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderReviewComponent } from './order-review/order-review.component';

const routes: Routes = [{ path: 'review', component: OrderReviewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}
