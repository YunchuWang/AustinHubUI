import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-account-management-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.less'],
})
export class AccountManagementForgotPasswordComponent implements OnInit {
  form: FormGroup;
  error = '';
  emailSent: boolean = true;
  constructor(private http: _HttpClient, fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = fb.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }
  ngOnInit(): void {}
  forgotPassword(): void {
    // request forgotpassword
    const email = this.form.controls['email'].value;
    this.authService.resetPassword(email).subscribe((res) => {
      this.router.navigate(['/auth/forgot-password-result', email]);
    });
  }
}
