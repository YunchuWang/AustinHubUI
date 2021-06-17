import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ShoppingItem, ShoppingService } from '@core';
import { MakePaymentFormComponent } from '@shared';

@Component({
  selector: 'app-order-review',
  templateUrl: './order-review.component.html',
  styles: [],
})
export class OrderReviewComponent implements OnInit {
  @ViewChild('venmoBtn') venmoBtn;
  @ViewChild('creditCardBtn') creditCardBtn;
  totalPrice = 0.0;

  constructor(public router: Router, public shoppingService: ShoppingService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.totalPrice = this.calculateOrderTotal();
  }

  getShoppingItemName(shoppingItem: ShoppingItem): string {
    if (shoppingItem.merchandise.type === 'membership') {
      return shoppingItem.merchandise.name + ' Membership';
    }
    return shoppingItem.resource[0].name;
  }

  getArr(resourceItem: any): any[] {
    return Array.from(resourceItem);
  }

  onClickPay(event: any): void {
    this.dialog.open(MakePaymentFormComponent, {
      width: '50%',
      minWidth: 200,
      data: this.totalPrice,
    });
  }

  backToShoppingCart(): void {
    this.router.navigateByUrl(this.shoppingService.hasResource() ? '/shopping/cart' : '/shopping/cart/empty');
  }

  calculateOrderTotal(): number {
    if (!this.shoppingService.shoppingItems || this.shoppingService.shoppingItems.length === 0) {
      return 0.0;
    }

    return this.shoppingService.shoppingItems.map((item) => item.price).reduce((sum, currentPrice) => sum + currentPrice);
  }
}
