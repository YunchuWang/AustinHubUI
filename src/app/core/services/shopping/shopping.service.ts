import { Injectable } from '@angular/core';
import { AuthService, ShoppingItem } from '@core';
import { _HttpClient } from '@delon/theme';

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  constructor(private httpClient: _HttpClient, private authService: AuthService) {}

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
        owner: this.authService.getUserName(),
        shoppingItems: this.shoppingItems,
      }),
    );
  }

  generateNewOrder(transactionAmount: number): any {
    const order = {
      accountName: this.authService.getUserName(),
      price: transactionAmount,
      orderItems: [],
      orderType: 'NEW',
    };
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

  generateRenewOrder(transactionAmount: number, itemsToRenew: any[]): any {
    const order = {
      accountName: this.authService.getUserName(),
      price: transactionAmount,
      orderItems: [],
      orderType: 'RENEW',
    };

    itemsToRenew.forEach((itemToRenew) => {
      order.orderItems.push({
        itemType: itemToRenew.type.toUpperCase(),
        pricingPlan: itemToRenew.pricingPlan,
        itemId: itemToRenew.id,
      });
    });

    console.log(order);
    return order;
  }

  clearCart(): void {
    localStorage.removeItem('shopping_cart');
    this.shoppingItems = [];
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
}
