import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

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

  setAccountFromToken(token: string): void {
    const account = jwt_decode(token);
    console.log(account);

    localStorage.setItem('account', account['sub']);
  }

  isLoggedIn(): boolean {
    if (!localStorage.getItem('account')) return false;
    return true;
  }

  refreshToken(refreshToken: any): Observable<any> {
    return this.httpClient.post(this.resource_base_url + '/refreshToken', { refreshToken: refreshToken });
  }
}
