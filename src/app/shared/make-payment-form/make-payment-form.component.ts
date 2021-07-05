import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService, OrderService, PaymentService, ShoppingService } from '@core';
import * as dropin from 'braintree-web-drop-in';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-credit-card-payment-form',
  templateUrl: './make-payment-form.component.html',
  styleUrls: ['./make-payment-form.component.less'],
})
export class MakePaymentFormComponent implements OnInit {
  placeOrderHidden = true;
  placeOrderDisabled = true;
  transactionAmount: any;
  private renewOrder: any;
  @ViewChild('placeOrderBtn') placeOrderBtn;

  constructor(
    public dialogRef: MatDialogRef<MakePaymentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public router: Router,
    public authService: AuthService,
    public paymentService: PaymentService,
    public orderService: OrderService,
    public shoppingService: ShoppingService,
    public notificationService: NzNotificationService,
  ) {
    if (data.type === 'RENEW') {
      this.renewOrder = data.order;
      this.transactionAmount = Number(this.renewOrder.price).toFixed(2);
    } else {
      this.transactionAmount = Number(data).toFixed(2);
    }

    if (!this.transactionAmount) {
      this.notificationService.error(`Payment amount is unspecified!`, '');
      this.router.navigateByUrl('/shopping/cart');
    }
  }

  ngOnInit(): void {
    this.createPaymentBraintreeUI();
  }

  createPaymentBraintreeUI(): void {
    const customerId = this.authService.getCustomerId();
    this.paymentService.getClientToken(customerId).subscribe((token) => {
      dropin.create(
        {
          // Insert your tokenization key here
          authorization: token.client_token,
          container: '#dropin-container',
          locale: 'zh_CN',
          card: {
            cardholderName: {
              required: true,
            },
          },
          paypal: {
            flow: 'checkout',
            amount: this.transactionAmount.toString(),
            currency: 'USD',
          },
        },
        (createErr, instance) => {
          if (createErr) {
            this.notificationService.error(`Please contact support ${createErr}`, '');
            return;
          }

          this.placeOrderHidden = false;
          const btn = this.placeOrderBtn.el.nativeElement;
          if (customerId) {
            this.placeOrderDisabled = false;
          }

          btn.addEventListener('click', () => {
            instance.requestPaymentMethod((requestPaymentMethodErr, payload) => {
              // When the user clicks on the 'Submit payment' button this code will send the
              // encrypted payment information in a variable called a payment method nonce
              if (requestPaymentMethodErr) {
                this.notificationService.error(`Please contact support ${requestPaymentMethodErr}`, '');
                return;
              }
              // pre-create order with status open
              // if failed, msg to retry after some time or contact support

              // if passed, continue
              // Make payment
              // construct order info
              if (!!this.renewOrder) {
                this.orderService.renewOrder(payload.nonce, this.renewOrder.price, this.renewOrder).subscribe((res) => {
                  this.notificationService.success('', res.message);
                  this.router.navigate(['/order/confirmation', res.orderNo]);
                  this.dialogRef.close(true);
                });
              } else {
                const order = this.shoppingService.generateNewOrder(this.transactionAmount);
                this.orderService.placeOrder(payload.nonce, this.transactionAmount.toString(), order).subscribe(
                  (res) => {
                    // if found customer id and account does not have customer id yet, update account with customer
                    // id
                    const newCustomerId = res.customerId;
                    if (newCustomerId && !this.authService.getCustomerId()) {
                      this.authService.updateAccountCustomerId(newCustomerId).subscribe((data) => {
                        localStorage.setItem('customerId', newCustomerId);
                      });
                    }
                    this.dialogRef.close();
                    this.notificationService.success('', res.message);
                    this.shoppingService.clearCart();
                    this.router.navigate(['/order/confirmation', res.orderNo]);
                  },
                  (error) => {
                    console.log(error);
                    this.notificationService.error('', error.message);
                    this.dialogRef.close();
                  },
                );
              }
            });
          });

          instance.on('paymentMethodRequestable', (event) => {
            this.placeOrderDisabled = false;
          });

          instance.on('noPaymentMethodRequestable', () => {
            this.placeOrderDisabled = true;
          });
        },
      );
    });
  }

  getPlaceOrderToolTip(): string {
    return !this.placeOrderHidden && this.placeOrderDisabled ? 'Please fill payment info first' : '';
  }
}
