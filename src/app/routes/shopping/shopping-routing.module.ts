import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingCartComponent } from './cart/cart.component';
import { EmptyCartComponent } from './empty-cart/empty-cart.component';
import { ShoppingMarketComponent } from './market/market.component';

const routes: Routes = [
  { path: 'market', component: ShoppingMarketComponent },
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'cart/empty', component: EmptyCartComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingRoutingModule {}
