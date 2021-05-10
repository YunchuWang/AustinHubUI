import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { ShoppingRoutingModule } from './shopping-routing.module';
import { ShoppingMarketComponent } from './market/market.component';
import { FlexModule } from '@angular/flex-layout';
import { CardsModule, MDBBootstrapModule } from 'angular-bootstrap-md';
import { ShoppingCartComponent } from './cart/cart.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

const COMPONENTS: Type<void>[] = [ShoppingMarketComponent, ShoppingCartComponent];

@NgModule({
  imports: [
    SharedModule,
    ShoppingRoutingModule,
    FlexModule,
    CardsModule,
    MDBBootstrapModule.forRoot(),
    MatFormFieldModule,
    MatSelectModule,
  ],
  declarations: COMPONENTS,
})
export class ShoppingModule {}
