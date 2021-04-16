import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountManagementLoginComponent } from './login/login.component';
import { AccountManagementRegisterComponent } from './register/register.component';
import { AccountManagementForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AccountManagementRegisterResultComponent } from './register-result/register-result.component';
import { AccountManagementPasswordResetComponent } from './password-reset/password-reset.component';
import { AccountManagementForgotPasswordResultComponent } from './forgot-password-result/forgot-password-result.component';
import { AccountManagementPasswordResetResultComponent } from './password-reset-result/password-reset-result.component';

const routes: Routes = [
  { path: 'login', component: AccountManagementLoginComponent },
  { path: 'register', component: AccountManagementRegisterComponent },
  { path: 'forgot-password', component: AccountManagementForgotPasswordComponent },
  { path: 'register-result/:email', component: AccountManagementRegisterResultComponent },
  { path: 'password-reset/:token', component: AccountManagementPasswordResetComponent },
  { path: 'password-reset-result', component: AccountManagementPasswordResetResultComponent },
  { path: 'forgot-password-result/:email', component: AccountManagementForgotPasswordResultComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountManagementRoutingModule {}
