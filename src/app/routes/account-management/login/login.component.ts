import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-account-management-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class AccountManagementLoginComponent implements OnInit {
  loginForm: FormGroup;
  error = '';
  constructor(
    private http: _HttpClient,
    private authService: AuthService,
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
    this.authService.login(this.loginForm.value).subscribe((res) => {
      this.tokenService.set({ token: res.accessToken, refreshToken: res.refreshToken });
      this.authService.setAccountFromToken(res.accessToken);
      this.router.navigate(['']);
    });
  }

  forgotPassword(): void {}

  isLoading(): boolean {
    return this.http.loading;
  }
}
