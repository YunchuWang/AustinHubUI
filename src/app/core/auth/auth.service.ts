import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly auth_base_url: string = '/api/accounts';

  constructor(public httpClient: _HttpClient) {}

  signup(data: any): Observable<any> {
    return this.httpClient.post(this.auth_base_url + '/signup', data);
  }

  login(data: any): Observable<any> {
    return this.httpClient.post(this.auth_base_url + '/signin', data);
  }

  resetPassword(email: string): Observable<any> {
    return this.httpClient.post(this.auth_base_url + '/resetpassword', {}, { email });
  }

  changePassword(token: string, password: string): Observable<any> {
    return this.httpClient.post(this.auth_base_url + '/changepassword', { token, password });
  }

  setAccountFromToken(token: string): void {
    const account = jwt_decode(token);
    // @ts-ignore
    localStorage.setItem('account', account.sub);
  }

  isLoggedIn(): boolean {
    if (!localStorage.getItem('account')) {
      return false;
    }
    return true;
  }

  getAcctInfo(): Observable<any> {
    return this.httpClient.get(this.auth_base_url + '/' + localStorage.getItem('account'));
  }

  refreshToken(refreshToken: any): Observable<any> {
    return this.httpClient.post(this.auth_base_url + '/refreshToken', { refreshToken });
  }
}
