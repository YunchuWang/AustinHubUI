import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ShoppingService } from '@core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './cart.component.html',
})
export class ShoppingCartComponent implements OnInit {
  planControls: FormControl[];

  // should have name, type, price, time len, description and shopping items
  constructor(private http: _HttpClient, public shoppingService: ShoppingService) {}

  ngOnInit(): void {
    this.planControls = this.shoppingService.shoppingItems.map((item) => new FormControl('', Validators.required));
  }

  calculateOrderTotal(): number {
    return this.shoppingService.shoppingItems.map((item) => item.price).reduce((sum, currentPrice) => sum + currentPrice);
  }

  removeShoppingItem(index: number): void {
    this.shoppingService.shoppingItems.splice(index, 1);
  }

  editResource(index: number): void {
    const shoppingItem = this.shoppingService.shoppingItems[index];
  }
}
