import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AlainThemeModule } from '@delon/theme';
import { DelonACLModule } from '@delon/acl';
import { DelonFormModule } from '@delon/form';
import { TranslateModule } from '@ngx-translate/core';
import { NzModalModule } from 'ng-zorro-antd/modal';

import { SHARED_DELON_MODULES } from './shared-delon.module';
import { SHARED_ZORRO_MODULES } from './shared-zorro.module';
import { NavbarComponent } from './navbar/navbar.component';
import { MainContentComponent } from './main-content/main-content.component';
import { IconsModule, MDBBootstrapModule, NavbarModule } from 'angular-bootstrap-md';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BoothCardComponent } from './booth-card/booth-card.component';
import { JobCardComponent } from './job-card/job-card.component';
import { FlexModule } from '@angular/flex-layout';
import { BoothFormComponent } from './booth-form/booth-form.component';
import { AdsFormComponent } from './ads-form/ads-form.component';
import { JobFormComponent } from './job-form/job-form.component';
import { MyResourceComponent } from './my-resource/my-resource.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';

// #region third libs

const THIRDMODULES: Type<any>[] = [];

// #endregion

// #region your componets & directives

const COMPONENTS: Type<any>[] = [];
const DIRECTIVES: Type<any>[] = [];

// #endregion

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
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
    MatIconModule,
    FlexModule,
    MatTooltipModule,
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
  ],
})
export class SharedModule {}
