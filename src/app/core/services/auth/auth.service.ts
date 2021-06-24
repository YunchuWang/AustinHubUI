import { Inject, Injectable } from '@angular/core';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { _HttpClient } from '@delon/theme';
import jwt_decode from 'jwt-decode';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { Role } from '../../models/Role';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly AUTH_BASE_URL: string = '/api/accounts';
  private account: any;

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

  setAccountFromToken(token: string): void {
    const decodedToken = jwt_decode(token);
    console.log(JSON.stringify(decodedToken));

    // If token expires, no account information to set
    // @ts-ignore
    if (Date.now() >= decodedToken.exp * 1000) {
      this.notificationService.error('Please log in again', '');
      this.tokenService.clear();
      return;
    }

    // From token, accountId is extracted, then load account info of id
    // @ts-ignore
    this.getAcctInfo(Number(decodedToken.sub)).subscribe(
      (acctInfo) => {
        console.log(acctInfo);
        this.account = acctInfo;
      },
      (error) => {
        this.notificationService.error('Account not found', '');
      },
    );
  }

  removeAccountInfo(): void {
    this.account = null;
  }

  getAccountId(): string {
    return this.account?.id;
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

  getMembership(): string {
    return this.account?.membership;
  }

  getRole(): Role {
    return this.account?.role;
  }

  isLoggedIn(): boolean {
    return !!this.account;
  }

  getAcctInfo(accountId: number): Observable<any> {
    return this.httpClient.get(this.AUTH_BASE_URL + '/' + accountId);
  }

  refreshToken(refreshToken: any): Observable<any> {
    return this.httpClient.post(this.AUTH_BASE_URL + '/refreshToken', { refreshToken });
  }

  updateAccountCustomerId(customerId: string): Observable<any> {
    return this.httpClient.post(this.AUTH_BASE_URL + '/' + this.getAccountId() + '/customerId', customerId);
  }
}
