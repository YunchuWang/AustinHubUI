import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { OrderReviewComponent } from './order-review/order-review.component';

const routes: Routes = [
  { path: 'review', component: OrderReviewComponent },
  { path: 'confirmation/:orderNo', component: OrderConfirmationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}
