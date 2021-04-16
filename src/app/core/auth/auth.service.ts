import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly resource_base_url: string = '/accounts';

  constructor(public httpClient: _HttpClient) {}

  signup(data): Observable<any> {
    return this.httpClient.post(this.resource_base_url + '/signup', data);
  }

  login(data): Observable<any> {
    return this.httpClient.post(this.resource_base_url + '/signin', data);
  }

  resetPassword(email: string): Observable<any> {
    return this.httpClient.post(this.resource_base_url + '/resetpassword', {}, { email: email });
  }

  changePassword(token: string, password: string): Observable<any> {
    return this.httpClient.post(this.resource_base_url + '/changepassword', { token: token, password: password });
  }
}
