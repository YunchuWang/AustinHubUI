import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GlobalFooterModule } from '@delon/abc/global-footer';
import { NoticeIconModule } from '@delon/abc/notice-icon';
import { LayoutDefaultModule } from '@delon/theme/layout-default';
import { SettingDrawerModule } from '@delon/theme/setting-drawer';
import { ThemeBtnModule } from '@delon/theme/theme-btn';
import { TranslateModule } from '@ngx-translate/core';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSpinModule } from 'ng-zorro-antd/spin';

import { LayoutBasicComponent } from './basic/basic.component';
import { HeaderClearStorageComponent } from './basic/widgets/clear-storage.component';
import { HeaderFullScreenComponent } from './basic/widgets/fullscreen.component';
import { HeaderSearchComponent } from './basic/widgets/search.component';
import { HeaderUserComponent } from './basic/widgets/user.component';
import { LayoutBlankComponent } from './blank/blank.component';

const COMPONENTS = [LayoutBasicComponent, LayoutBlankComponent];

const HEADERCOMPONENTS = [HeaderSearchComponent, HeaderFullScreenComponent, HeaderClearStorageComponent, HeaderUserComponent];

// passport
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from '@shared';
import { IconsModule, MDBBootstrapModule, NavbarModule } from 'angular-bootstrap-md';
import { LayoutMainComponent } from './layout-main/layout-main.component';
import { LayoutPassportComponent } from './passport/passport.component';
import { FlexModule } from '@angular/flex-layout';
const PASSPORT = [LayoutPassportComponent];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ThemeBtnModule,
    SharedModule,
    SettingDrawerModule,
    LayoutDefaultModule,
    TranslateModule,
    NoticeIconModule,
    GlobalFooterModule,
    NzDropDownModule,
    NzInputModule,
    NzAutocompleteModule,
    NzGridModule,
    NzFormModule,
    NzSpinModule,
    NzBadgeModule,
    NzAvatarModule,
    NzIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FlexModule,
  ],
  declarations: [...COMPONENTS, ...HEADERCOMPONENTS, ...PASSPORT, LayoutMainComponent],
  exports: [...COMPONENTS, ...PASSPORT, ...HEADERCOMPONENTS, LayoutMainComponent],
})
export class LayoutModule {}
