import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { AccountManagementRoutingModule } from './account-management-routing.module';
import { AccountManagementLoginComponent } from './login/login.component';
import { AccountManagementRegisterComponent } from './register/register.component';
import { AccountManagementForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AccountManagementRegisterResultComponent } from './register-result/register-result.component';
import { AccountManagementPasswordResetComponent } from './password-reset/password-reset.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { AccountManagementForgotPasswordResultComponent } from './forgot-password-result/forgot-password-result.component';
import { AccountManagementPasswordResetResultComponent } from './password-reset-result/password-reset-result.component';

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
