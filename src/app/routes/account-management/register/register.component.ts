import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { AuthService } from '../../../core/auth/auth.service';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { PasswordUtil } from '../../../core/utils/password.util';

@Component({
  selector: 'app-account-management-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
})
export class AccountManagementRegisterComponent implements OnInit {
  registerForm: FormGroup;
  error: string = '';
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

  submit() {
    this.authService.signup(this.registerForm.value).subscribe((res) => {
      this.tokenService.set({ token: res.accessToken, refreshToken: res.refreshToken });
      this.router.navigate(['/auth/register-result', this.registerForm.controls['email'].value]);
    });
  }

  isLoading(): boolean {
    return this.authService.httpClient.loading;
  }
}
