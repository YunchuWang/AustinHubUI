import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, PasswordUtil } from '@core';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-account-management-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
})
export class AccountManagementRegisterComponent implements OnInit {
  registerForm: FormGroup;
  error = '';
  visible: boolean;
  status = 'pool';
  progress = 0;
  passwordProgressMap: { [key: string]: 'success' | 'normal' | 'exception' } = {
    ok: 'success',
    pass: 'normal',
    pool: 'exception',
  };

  constructor(
    fb: FormBuilder,
    private router: Router,
    public msg: NzMessageService,
    public authService: AuthService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
  ) {
    this.registerForm = fb.group({
      username: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(45)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6), PasswordUtil.checkPassword.bind(this)]],
      confirm: [null, [Validators.required, Validators.minLength(6), PasswordUtil.passwordEqual]],
    });
  }

  ngOnInit(): void {}

  submit(): void {
    if (!this.registerForm.valid) {
      this.error = 'Please enter valid information to sign up!';
      return;
    }
    this.authService.signup(this.registerForm.value).subscribe(
      (res) => {
        this.tokenService.set({ token: res.accessToken, refreshToken: res.refreshToken });
        this.router.navigate(['/auth/register-result', this.registerForm.controls.email.value]);
      },
      (err) => {
        console.log(err);
        this.error = err?.error?.message || 'Unknown error';
      },
    );
  }

  isLoading(): boolean {
    return this.authService.httpClient.loading;
  }
}
