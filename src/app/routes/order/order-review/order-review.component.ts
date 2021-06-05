import { Component, OnInit } from '@angular/core';
import { ShoppingItem, ShoppingService } from '@core';

@Component({
  selector: 'app-order-review',
  templateUrl: './order-review.component.html',
  styles: [],
})
export class OrderReviewComponent implements OnInit {
  totalPrice = 0.0;

  constructor(public shoppingService: ShoppingService) {}

  ngOnInit(): void {}

  order(event: any): void {}

  getShoppingItemName(shoppingItem: ShoppingItem): string {
    if (shoppingItem.merchandise.type === 'membership') {
      return shoppingItem.merchandise.name + ' Membership';
    }
    return shoppingItem.resource[0].name;
  }

  getArr(resourceItem: any): any[] {
    return Array.from(resourceItem);
  }
}
