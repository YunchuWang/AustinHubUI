import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { API_PREFIX_PATH } from '../../constants/ApiClientConstants';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  ORDER_BASE_URL = API_PREFIX_PATH + '/orders';

  constructor(private httpClient: _HttpClient) {}

  loadOrders(accountName: string): Observable<any> {
    return this.httpClient.get(this.ORDER_BASE_URL + '/owned', { accountName });
  }

  public placeOrder(
    nonce: string,
    transactionAmount: string,
    order: { accountName: string; price: number; orderItems: { itemType: null } },
  ): Observable<any> {
    return this.httpClient.post(this.ORDER_BASE_URL + '/make', {
      nonce,
      transactionAmount,
      orderInfo: order,
    });
  }

  public renewOrder(nonce: string, transactionAmount: any, order: any): Observable<any> {
    return this.httpClient.post(this.ORDER_BASE_URL + '/renew', {
      nonce,
      transactionAmount,
      orderInfo: order,
    });
  }
}
