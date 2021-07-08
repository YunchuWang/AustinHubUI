import { NgModule, Type } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatBadgeModule } from '@angular/material/badge';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '@shared';
import { CardsModule, MDBBootstrapModule } from 'angular-bootstrap-md';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { ShoppingCartComponent } from './cart/cart.component';
import { EmptyCartComponent } from './empty-cart/empty-cart.component';
import { ShoppingMarketComponent } from './market/market.component';
import { ShoppingRoutingModule } from './shopping-routing.module';
import { MatButtonModule } from '@angular/material/button';

const COMPONENTS: Type<void>[] = [ShoppingMarketComponent, ShoppingCartComponent, EmptyCartComponent];

@NgModule({
  imports: [
    SharedModule,
    ShoppingRoutingModule,
    FlexModule,
    CardsModule,
    MDBBootstrapModule.forRoot(),
    MatFormFieldModule,
    MatSelectModule,
    NzBadgeModule,
    MatBadgeModule,
    MatButtonModule,
  ],
  declarations: COMPONENTS,
})
export class ShoppingModule {}
