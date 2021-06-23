import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { API_PREFIX_PATH } from '../constants/ApiClientConstants';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orderBaseUrl = API_PREFIX_PATH + '/orders';
  constructor(private httpClient: _HttpClient) {}

  loadOrders(accountName: string): Observable<any> {
    return this.httpClient.get(this.orderBaseUrl + '/owned', { accountName });
  }
}
