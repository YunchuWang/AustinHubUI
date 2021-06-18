import { Injectable } from '@angular/core';
import { ResourcePlan, ShoppingItem } from '@core';
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
    return this._shoppingItems && this._shoppingItems.length > 0;
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

  makeOrder(transactionAmount: number): any {
    const order = {
      accountName: localStorage.getItem('account'),
      price: transactionAmount,
      orderItems: [],
    };
    console.log(this.shoppingItems);
    this.shoppingItems.forEach((shoppingItem) => {
      let orderItem;
      if (shoppingItem.merchandise.type === 'membership') {
        orderItem = {
          itemType: shoppingItem.merchandise.type.toUpperCase(),
          pricingPlan: shoppingItem.plan,
          autoSubscribed: true,
          membershipType: shoppingItem.merchandise.name,
          resourceItems: this.generateOrderItems(shoppingItem.resource, shoppingItem.plan),
        };
      } else {
        orderItem = {
          itemType: shoppingItem.merchandise.tableName.toUpperCase(),
          pricingPlan: shoppingItem.plan,
          categoryName: shoppingItem.resource[0].category,
          ...shoppingItem.resource[0],
        };
      }
      order.orderItems.push(orderItem);
    });

    console.log(order);
    return order;
  }

  private generateOrderItems(resource: any[], pricingPlan: string): any[] {
    return resource.map((item) => {
      return {
        itemType: item.type.toUpperCase(),
        pricingPlan,
        categoryName: item.category,
        ...item,
      };
    });
  }

  clearCart(): void {
    localStorage.removeItem('shopping_cart');
    this.shoppingItems = [];
  }
}
