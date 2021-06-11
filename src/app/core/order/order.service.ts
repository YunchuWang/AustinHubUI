import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httpClient: _HttpClient) {}
}
