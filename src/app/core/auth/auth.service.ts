import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly AUTH_BASE_URL: string = '/api/accounts';

  constructor(public httpClient: _HttpClient) {}

  signup(data: any): Observable<any> {
    return this.httpClient.post(this.AUTH_BASE_URL + '/signup', data);
  }

  login(data: any): Observable<any> {
    return this.httpClient.post(this.AUTH_BASE_URL + '/signin', data);
  }

  resetPassword(email: string): Observable<any> {
    return this.httpClient.post(this.AUTH_BASE_URL + '/resetpassword', {}, { email });
  }

  changePassword(token: string, password: string): Observable<any> {
    return this.httpClient.post(this.AUTH_BASE_URL + '/changepassword', { token, password });
  }

  setAccountFromToken(token: string): void {
    const account = jwt_decode(token);
    console.log(JSON.stringify(account));
    // @ts-ignore
    localStorage.setItem('account', account.sub);
    // @ts-ignore
    localStorage.setItem('email', account.email);
    // @ts-ignore
    localStorage.setItem('customerId', account.customerId);
  }

  getCustomerId(): string {
    return localStorage.getItem('customerId');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('account') !== undefined;
  }

  getAcctInfo(): Observable<any> {
    return this.httpClient.get(this.AUTH_BASE_URL + '/' + localStorage.getItem('account'));
  }

  refreshToken(refreshToken: any): Observable<any> {
    return this.httpClient.post(this.AUTH_BASE_URL + '/refreshToken', { refreshToken });
  }

  updateAccountCustomerId(customerId: string): Observable<any> {
    const accountName = localStorage.getItem('account');
    if (!accountName) {
      throw new Error('Account name cant be found!');
    }
    return this.httpClient.post(this.AUTH_BASE_URL + '/' + accountName + '/customerId', customerId);
  }
}
