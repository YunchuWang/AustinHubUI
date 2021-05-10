import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingMarketComponent } from './market/market.component';
import { ShoppingCartComponent } from './cart/cart.component';

const routes: Routes = [
  { path: 'market', component: ShoppingMarketComponent },
  { path: 'cart', component: ShoppingCartComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingRoutingModule {}
