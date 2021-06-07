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
    // @ts-ignore
    localStorage.setItem('account', account.sub);
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
}
