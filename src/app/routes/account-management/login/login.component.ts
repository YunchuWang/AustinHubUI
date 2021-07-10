import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, I18NService, ShoppingService } from '@core';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { _HttpClient, ALAIN_I18N_TOKEN } from '@delon/theme';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: `app-account-management-login`,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class AccountManagementLoginComponent implements OnInit {
  loginForm: FormGroup;
  error = '';

  constructor(
    private http: _HttpClient,
    private authService: AuthService,
    private translate: TranslateService,
    @Inject(ALAIN_I18N_TOKEN) private i18n: I18NService,
    private shoppingService: ShoppingService,
    private notificationService: NzNotificationService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    fb: FormBuilder,
    private router: Router,
  ) {
    this.loginForm = fb.group({
      username: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(45)]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  submit(): void {
    if (!this.loginForm.valid) {
      this.error = 'Please enter your username and password correctly!';
      return;
    }
    this.authService.login(this.loginForm.value).subscribe(
      async (tokens) => {
        this.tokenService.set({ token: tokens.accessToken, refreshToken: tokens.refreshToken });
        const accessToken = this.authService.decodeToken(this.tokenService.get().token);
        await this.setUpAccount(accessToken);

        this.router.navigate(['']);
      },
      (err) => {
        console.log(err);
        this.error = err?.error?.message || 'Unknown error';
      },
    );
  }

  isLoading(): boolean {
    return this.http.loading;
  }

  private async setUpAccount(accessToken: string): Promise<void> {
    if (accessToken) {
      try {
        const acctInfo = await this.authService.getAcctInfo(Number(accessToken.sub));
        this.authService.account = acctInfo;
        // load account preference if any
        const accountPreference = acctInfo.preference;
        if (!!accountPreference) {
          if (accountPreference.lang) {
            this.i18n.use(accountPreference.lang);
            this.translate.setDefaultLang(accountPreference.lang);
          }
        }

        // Load shopping items from localStorage
        const shoppingItems = localStorage.getItem('shopping_cart');
        if (shoppingItems) {
          const shoppingInfo = JSON.parse(shoppingItems);
          if (this.authService.getUserName() === shoppingInfo.owner) {
            this.shoppingService.shoppingItems = shoppingInfo.shoppingItems || [];
          } else {
            this.shoppingService.shoppingItems = [];
          }
        } else {
          this.shoppingService.shoppingItems = [];
        }
      } catch (e) {
        this.notificationService.error('Account can not be found!', '');
        this.tokenService.clear();
        this.router.navigate(['/auth/login']);
      }
    }
  }
}
