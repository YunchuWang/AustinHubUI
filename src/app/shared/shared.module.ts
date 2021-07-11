import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DelonACLModule } from '@delon/acl';
import { DelonFormModule } from '@delon/form';
import { AlainThemeModule } from '@delon/theme';
import { TranslateModule } from '@ngx-translate/core';

import { FlexModule } from '@angular/flex-layout';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ButtonsModule, IconsModule, MDBBootstrapModule, NavbarModule, TooltipModule, WavesModule } from 'angular-bootstrap-md';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NgxPaginationModule } from 'ngx-pagination';
import { HeaderI18nComponent } from '../layout/basic/widgets/i18n.component';
import { AdsCardComponent } from './ads-card/ads-card.component';
import { AdsFormComponent } from './ads-form/ads-form.component';
import { BoothCardComponent } from './booth-card/booth-card.component';
import { BoothFormComponent } from './booth-form/booth-form.component';
import { FooterComponent } from './footer/footer.component';
import { HasPermissionDirective } from './has-permission.directive';
import { JobCardComponent } from './job-card/job-card.component';
import { JobFormComponent } from './job-form/job-form.component';
import { MainContentComponent } from './main-content/main-content.component';
import { MakePaymentFormComponent } from './make-payment-form/make-payment-form.component';
import { MyResourceComponent } from './my-resource/my-resource.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ResourceEditFormComponent } from './resource-edit-form/resource-edit-form.component';
import { SHARED_DELON_MODULES } from './shared-delon.module';
import { SHARED_ZORRO_MODULES } from './shared-zorro.module';
import { CustomerAgreementFormComponent } from './customer-agreement-form/customer-agreement-form.component';
import { ContactUsFormComponent } from './contact-us-form/contact-us-form.component';

// #region third libs

const THIRDMODULES: Type<any>[] = [];

// #endregion

// #region your componets & directives

const COMPONENTS: Type<any>[] = [HeaderI18nComponent];
const DIRECTIVES: Type<any>[] = [];

// #endregion

@NgModule({
  imports: [
    MatTooltipModule,
    CommonModule,
    FormsModule,
    RouterModule,
    TranslateModule,
    ReactiveFormsModule,
    AlainThemeModule.forChild(),
    DelonACLModule,
    DelonFormModule,
    ...SHARED_DELON_MODULES,
    ...SHARED_ZORRO_MODULES,
    // third libs
    ...THIRDMODULES,
    NavbarModule,
    IconsModule,
    MDBBootstrapModule.forRoot(),
    MatSidenavModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatTabsModule,
    MatDialogModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    FlexModule,
    MatBadgeModule,
    NzUploadModule,
    ButtonsModule,
    TooltipModule,
    WavesModule,
    NgxPaginationModule,
  ],
  declarations: [
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
    NavbarComponent,
    MainContentComponent,
    BoothCardComponent,
    JobCardComponent,
    BoothFormComponent,
    AdsFormComponent,
    JobFormComponent,
    MyResourceComponent,
    ResourceEditFormComponent,
    AdsCardComponent,
    MakePaymentFormComponent,
    FooterComponent,
    HasPermissionDirective,
    CustomerAgreementFormComponent,
    ContactUsFormComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AlainThemeModule,
    DelonACLModule,
    DelonFormModule,
    TranslateModule,
    ...SHARED_DELON_MODULES,
    ...SHARED_ZORRO_MODULES,
    // third libs
    ...THIRDMODULES,
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
    NavbarComponent,
    MainContentComponent,
    MyResourceComponent,
    ResourceEditFormComponent,
    BoothCardComponent,
    JobCardComponent,
    AdsCardComponent,
    MakePaymentFormComponent,
    FooterComponent,
    HasPermissionDirective,
  ],
})
export class SharedModule {}
