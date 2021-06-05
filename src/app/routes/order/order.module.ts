import { NgModule, Type } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { SharedModule } from '@shared';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { OrderReviewComponent } from './order-review/order-review.component';
import { OrderRoutingModule } from './order-routing.module';

const COMPONENTS: Type<void>[] = [OrderReviewComponent];

@NgModule({
  imports: [MDBBootstrapModule.forRoot(), FlexModule, MatExpansionModule, SharedModule, OrderRoutingModule, MatDividerModule],
  declarations: COMPONENTS,
})
export class OrderModule {}
