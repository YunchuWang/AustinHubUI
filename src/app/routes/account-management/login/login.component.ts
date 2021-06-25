import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, ShoppingService } from '@core';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { _HttpClient } from '@delon/theme';
import { NzNotificationService } from 'ng-zorro-antd/notification';

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
      async (res) => {
        this.tokenService.set({ token: res.accessToken, refreshToken: res.refreshToken });
        const accessToken = this.authService.decodeToken(this.tokenService.get().token);

        if (accessToken) {
          try {
            const acctInfo = await this.authService.getAcctInfo(Number(accessToken.sub));
            console.log(acctInfo);
            this.authService.account = acctInfo;
            // Load shopping items from localStorage
            const shoppingItems = localStorage.getItem('shopping_cart');
            if (shoppingItems) {
              const shoppingInfo = JSON.parse(shoppingItems);
              console.log(this.authService.getUserName());
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

        this.router.navigate(['']);
      },
      (err) => {
        console.log(err);
        this.error = err?.error?.message || 'Unknown error';
      },
    );
  }

  forgotPassword(): void {}

  isLoading(): boolean {
    return this.http.loading;
  }
}
