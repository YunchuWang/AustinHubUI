import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PaymentService, ShoppingService } from '@core';
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
  transactionAmount: number;
  @ViewChild('placeOrderBtn') placeOrderBtn;

  constructor(
    public dialogRef: MatDialogRef<MakePaymentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public router: Router,
    public paymentService: PaymentService,
    public shoppingService: ShoppingService,
    public notificationService: NzNotificationService,
  ) {
    this.transactionAmount = data;
    if (!this.transactionAmount) {
      this.notificationService.error(`Payment amount is unspecified!`, '');
      this.router.navigateByUrl('/shopping/cart');
    }
  }

  ngOnInit(): void {
    this.createPaymentBraintreeUI();
  }

  createPaymentBraintreeUI(): void {
    this.paymentService.getClientToken().subscribe((token) => {
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
              this.paymentService.makePayment(payload.nonce, this.transactionAmount.toString()).subscribe((res) => {
                // if successful, fulfill order -> mark order completed and activate resource
                // if failed, delete order and inform customer to retry
                this.fulfillOrder();
                // if order fulfilled, redirect to whatever page and send confirmation email
                // if not, send toast msg to inform customer to contact customer service for manual fulfill or refund
              });
            });
          });

          instance.on('paymentMethodRequestable', (event) => {
            console.log(event.type); // The type of Payment Method, e.g 'CreditCard', 'PayPalAccount'.
            console.log(event.paymentMethodIsSelected); // True if a customer has selected a payment method when paymentMethodRequestable fires.

            this.placeOrderDisabled = false;
          });

          instance.on('noPaymentMethodRequestable', () => {
            this.placeOrderDisabled = true;
          });
        },
      );
    });
  }

  fulfillOrder(): void {
    this.transactionAmount;
    //
  }

  getPlaceOrderToolTip(): string {
    return !this.placeOrderHidden && this.placeOrderDisabled ? 'Please fill payment info first' : '';
  }
}
