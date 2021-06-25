import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ACLService } from '@delon/acl';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { ALAIN_I18N_TOKEN, MenuService, SettingsService, TitleService } from '@delon/theme';
import { TranslateService } from '@ngx-translate/core';
import { I18NService } from '../i18n/i18n.service';

import { NzIconService } from 'ng-zorro-antd/icon';
import { ICONS } from '../../../../style-icons';
import { ICONS_AUTO } from '../../../../style-icons-auto';
import { AuthService } from '../auth/auth.service';
import { ShoppingService } from '../shopping/shopping.service';

/**
 * Used for application startup
 * Generally used to get the basic data of the application, like: Menu Data, User Data, etc.
 */
@Injectable()
export class StartupService {
  constructor(
    iconSrv: NzIconService,
    private menuService: MenuService,
    private translate: TranslateService,
    @Inject(ALAIN_I18N_TOKEN) private i18n: I18NService,
    private settingService: SettingsService,
    private shoppingService: ShoppingService,
    private aclService: ACLService,
    private titleService: TitleService,
    private authService: AuthService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private httpClient: HttpClient,
  ) {
    iconSrv.addIcon(...ICONS_AUTO, ...ICONS);
  }

  load(): Promise<any> {
    // only works with promises
    // https://github.com/angular/angular/issues/15088
    return new Promise((resolve, reject) => {
      // http
      // this.viaHttp(resolve, reject);
      // mock：请勿在生产环境中这么使用，viaMock 单纯只是为了模拟一些数据使脚手架一开始能正常运行
      this.viaMockI18n(resolve, reject);
    });
  }

  private viaMockI18n(resolve: any, reject: any): void {
    this.httpClient.get(`assets/tmp/i18n/${this.i18n.defaultLang}.json`).subscribe((langData) => {
      this.translate.setTranslation(this.i18n.defaultLang, langData);
      this.translate.setDefaultLang(this.i18n.defaultLang);

      this.viaMock(resolve, reject);
    });
  }

  private viaMock(resolve: any, reject: any): void {
    // Subscribe to token expiration event
    this.tokenService.refresh.subscribe((event) => {
      this.authService.removeAccountInfo();
      const refreshToken = this.tokenService.get().refreshToken;
      this.authService.refreshToken(refreshToken).subscribe(
        (token) => {
          this.tokenService.get().token = token;
        },
        (error) => {
          this.tokenService.clear();
        },
      );
    });

    // Set account info
    const accessToken = this.tokenService.get().token;
    if (accessToken) {
      this.authService.setAccountFromToken(accessToken);
    }

    // Load shopping items from localStorage
    const shoppingItems = localStorage.getItem('shopping_cart');
    if (shoppingItems) {
      const shoppingInfo = JSON.parse(shoppingItems);
      if (this.authService.getUserName() === shoppingInfo.owner) {
        this.shoppingService.shoppingItems = shoppingInfo.shoppingItems || [];
      } else {
        this.shoppingService.shoppingItems = [];
      }
    } else {
      this.shoppingService.shoppingItems = [];
    }

    resolve({});
  }
}
