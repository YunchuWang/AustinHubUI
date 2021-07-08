import { Inject, Injectable } from '@angular/core';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { _HttpClient } from '@delon/theme';
import jwt_decode from 'jwt-decode';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable, of } from 'rxjs';
import { Role } from '../../models/Role';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly AUTH_BASE_URL: string = '/api/accounts';
  account: any;

  constructor(
    public httpClient: _HttpClient,
    public notificationService: NzNotificationService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
  ) {}

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

  decodeToken(token: string): any {
    if (!token) {
      return null;
    }
    const decodedToken = jwt_decode(token);
    console.log(JSON.stringify(decodedToken));

    // If token expires, no account information to set
    // @ts-ignore
    if (Date.now() >= decodedToken.exp * 1000) {
      this.notificationService.error('Please log in again', '');
      this.tokenService.clear();
    }

    return decodedToken;
  }

  removeAccountInfo(): void {
    this.account = null;
  }

  getCustomerId(): string {
    return this.account?.customerId;
  }

  getEmail(): string {
    return this.account?.email;
  }

  getUserName(): string {
    return this.account?.username;
  }

  getPreferredLang(): string {
    return this.account?.preference?.lang;
  }

  getMembership(): string {
    return this.account?.membership;
  }

  getRole(): Role {
    return this.account?.role;
  }

  isLoggedIn(): boolean {
    return !!this.account;
  }

  getAcctInfo(accountId: number): Promise<any> {
    return this.httpClient.get(this.AUTH_BASE_URL + '/' + accountId).toPromise();
  }

  refreshToken(refreshToken: any): Observable<any> {
    return this.httpClient.post(this.AUTH_BASE_URL + '/refreshToken', { refreshToken });
  }

  updateAccountCustomerId(customerId: string): Observable<any> {
    return this.httpClient.post(this.AUTH_BASE_URL + '/' + this.getUserName() + '/customerId', customerId);
  }

  updatePreference(preference: { lang: string }): Observable<any> {
    return this.httpClient.post(this.AUTH_BASE_URL + '/' + this.getUserName() + '/preference', preference);
  }
}
