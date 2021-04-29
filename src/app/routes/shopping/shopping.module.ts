import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { ShoppingRoutingModule } from './shopping-routing.module';
import { ShoppingMarketComponent } from './market/market.component';

const COMPONENTS: Type<void>[] = [ShoppingMarketComponent];

@NgModule({
  imports: [SharedModule, ShoppingRoutingModule],
  declarations: COMPONENTS,
})
export class ShoppingModule {}
