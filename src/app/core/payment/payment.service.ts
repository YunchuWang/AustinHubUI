import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { API_PREFIX_PATH } from '../constants/ApiClientConstants';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private readonly PAYMENT_BASE_URL = '/payment';
  private readonly CLIENT_TOKEN_RESOURCE_URL = '/client_token';

  constructor(private httpClient: _HttpClient) {}

  public makePayment(
    nonce: string,
    transactionAmount: string,
    order: { accountName: string; price: number; orderItems: { itemType: null } },
  ): Observable<any> {
    return this.httpClient.post(API_PREFIX_PATH + this.PAYMENT_BASE_URL + '/make', {
      nonce,
      transactionAmount,
      orderInfo: order,
    });
  }

  public getClientToken(customerId: string): Observable<any> {
    return this.httpClient.post(API_PREFIX_PATH + this.PAYMENT_BASE_URL + this.CLIENT_TOKEN_RESOURCE_URL, customerId);
  }
}
