import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-account-management-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.less'],
})
export class AccountManagementForgotPasswordComponent implements OnInit {
  form: FormGroup;
  error = '';
  emailSent = true;

  constructor(private http: _HttpClient, fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = fb.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {}

  forgotPassword(): void {
    if (!this.form.valid) {
      this.error = 'Please enter an valid email address!';
      return;
    }

    const email = this.form.controls.email.value;
    this.authService.resetPassword(email).subscribe(
      (res) => {
        this.router.navigate(['/auth/forgot-password-result', email]);
      },
      (err) => {
        this.error = err?.error?.message || 'Unknown error';
      },
    );
  }
}
