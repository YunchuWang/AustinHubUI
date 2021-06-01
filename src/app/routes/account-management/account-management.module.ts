import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { AccountManagementRoutingModule } from './account-management-routing.module';
import { AccountManagementForgotPasswordResultComponent } from './forgot-password-result/forgot-password-result.component';
import { AccountManagementForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AccountManagementLoginComponent } from './login/login.component';
import { AccountManagementPasswordResetResultComponent } from './password-reset-result/password-reset-result.component';
import { AccountManagementPasswordResetComponent } from './password-reset/password-reset.component';
import { AccountManagementRegisterResultComponent } from './register-result/register-result.component';
import { AccountManagementRegisterComponent } from './register/register.component';

const COMPONENTS: Type<void>[] = [
  AccountManagementLoginComponent,
  AccountManagementRegisterComponent,
  AccountManagementForgotPasswordComponent,
  AccountManagementRegisterResultComponent,
  AccountManagementPasswordResetComponent,
  AccountManagementPasswordResetResultComponent,
  AccountManagementForgotPasswordResultComponent,
];

@NgModule({
  imports: [SharedModule, AccountManagementRoutingModule, NzLayoutModule],
  declarations: COMPONENTS,
})
export class AccountManagementModule {}
