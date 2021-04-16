import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from '../../../core/auth/auth.service';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { PasswordUtil } from '../../../core/utils/password.util';

@Component({
  selector: 'app-account-management-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.less'],
})
export class AccountManagementPasswordResetComponent implements OnInit {
  token: string;
  resetForm: FormGroup;
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
    route: ActivatedRoute,
    fb: FormBuilder,
    private router: Router,
    public msg: NzMessageService,
    public authService: AuthService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
  ) {
    this.token = route.snapshot.paramMap.get('token');
    this.resetForm = fb.group({
      password: [null, [Validators.required, Validators.minLength(6), PasswordUtil.checkPassword.bind(this)]],
      confirm: [null, [Validators.required, Validators.minLength(6), PasswordUtil.passwordEqual]],
    });
  }

  ngOnInit(): void {}

  submit() {
    this.authService.changePassword(this.token, this.resetForm.controls['password'].value).subscribe((res) => {
      this.router.navigate(['/auth/password-reset-result']);
    });
  }

  isLoading(): boolean {
    return this.authService.httpClient.loading;
  }
}
