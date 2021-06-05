import { Injectable } from '@angular/core';
import { ShoppingItem } from '@core';
import { _HttpClient } from '@delon/theme';

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  constructor(private httpClient: _HttpClient) {}

  private _shoppingItems: ShoppingItem[];

  get shoppingItems(): ShoppingItem[] {
    return this._shoppingItems;
  }

  set shoppingItems(value: ShoppingItem[]) {
    this._shoppingItems = value;
  }

  checkShoppingItemValid(shoppingItem: ShoppingItem): boolean {
    return shoppingItem.resource.every((item) => item.valid);
  }

  hasResource(): boolean {
    return this._shoppingItems.length > 0;
  }

  getResourceCount(): number {
    return this._shoppingItems.length;
  }

  saveShoppingItems(): void {
    localStorage.removeItem('shopping_cart');
    localStorage.setItem(
      'shopping_cart',
      JSON.stringify({
        owner: localStorage.getItem('account'),
        shoppingItems: this.shoppingItems,
      }),
    );
  }
}
