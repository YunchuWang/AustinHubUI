import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ShoppingItem, ShoppingService } from '@core';
import { ResourcePlan } from '@core';
import { _HttpClient } from '@delon/theme';
import { ResourceEditFormComponent } from '@shared';
import * as braintree from 'braintree-web';
import * as dropin from 'braintree-web-drop-in';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './cart.component.html',
})
export class ShoppingCartComponent implements OnInit {
  planControls: FormControl[];
  Plans = ResourcePlan;
  totalPrice = 0.0;
  resourcePlans = Object.values(ResourcePlan).filter((value) => typeof value === 'string');
  @ViewChild('venmoBtn') venmoBtn;
  constructor(private http: _HttpClient, public dialog: MatDialog, public shoppingService: ShoppingService) {}

  ngOnInit(): void {
    this.createBraintreeUI();
    this.planControls = this.shoppingService.shoppingItems.map((item) => new FormControl('', Validators.required));
    this.totalPrice = this.calculateOrderTotal();
  }

  calculateOrderTotal(): number {
    if (!this.shoppingService.shoppingItems || this.shoppingService.shoppingItems.length === 0) {
      return 0.0;
    }

    return this.shoppingService.shoppingItems.map((item) => item.price).reduce((sum, currentPrice) => sum + currentPrice);
  }

  removeShoppingItem(index: number): void {
    this.shoppingService.shoppingItems.splice(index, 1);
    this.totalPrice = this.calculateOrderTotal();
  }

  editResource(index: number): void {
    const shoppingItem = this.shoppingService.shoppingItems[index];
    this.dialog.open(ResourceEditFormComponent, {
      width: '50%',
      data: {
        resource: shoppingItem.resource,
      },
    });
  }

  createBraintreeUI(): void {
    // Create a client.
    braintree.client
      .create({
        authorization: 'sandbox_9qsnrvsq_w6q3k6s6ky2m4r5g',
        container: '#dropin-container',
      })
      .then((clientInstance) => {
        // Create a Venmo component.
        return braintree.venmo.create({
          client: clientInstance,
          allowDesktop: true,
        });
      })
      .then((venmoInstance) => {
        // ...
        if (!venmoInstance.isBrowserSupported()) {
          console.log('Browser does not support Venmo');
          return;
        }
        this.displayVenmoButton(venmoInstance);
      })
      .catch((err) => {
        // Handle component creation error
        console.log(err);
      });
    // dropin.create({
    //   authorization: 'sandbox_9qsnrvsq_w6q3k6s6ky2m4r5g',
    //   container: '#dropin-container',
    //   venmo: {
    //     allowNewBrowserTab: false
    //   }
    // }).then((data) => {
    //
    // }).catch((err) => {
    //   if (!venmoInstance.isBrowserSupported()) {
    //     console.log('Browser does not support Venmo');
    //     return;
    //   }
    //   console.log(err)
    // });
  }

  displayVenmoButton(venmoInstance: any): void {
    // Assumes that venmoButton is initially display: none.
    const btn = this.venmoBtn.el.nativeElement;
    btn.style.display = 'block';

    btn.addEventListener('click', () => {
      btn.disabled = true;

      venmoInstance.tokenize().then((payload) => {
        btn.removeAttribute('disabled');
        console.log(payload);

        // ...
      });
    });
  }

  onPlanChange(event: any, shoppingItem: ShoppingItem): void {
    switch (ResourcePlan[shoppingItem.plan]) {
      case ResourcePlan.MONTHLY:
        shoppingItem.price = shoppingItem.merchandise.monthlyPrice;
        break;
      case ResourcePlan.QUARTERLY:
        shoppingItem.price = shoppingItem.merchandise.quarterlyPrice;
        break;
      case ResourcePlan.YEARLY:
        shoppingItem.price = shoppingItem.merchandise.yearlyPrice;
        break;
    }
    this.totalPrice = this.calculateOrderTotal();
  }
}
