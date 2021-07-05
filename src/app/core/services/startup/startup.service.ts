import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ACLService } from '@delon/acl';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { ALAIN_I18N_TOKEN, MenuService, SettingsService, TitleService } from '@delon/theme';
import { TranslateService } from '@ngx-translate/core';
import { I18NService } from '../i18n/i18n.service';

import { Router } from '@angular/router';
import { NzIconService } from 'ng-zorro-antd/icon';
import { NzNotificationService } from 'ng-zorro-antd/notification';
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
    public notificationService: NzNotificationService,
    @Inject(ALAIN_I18N_TOKEN) private i18n: I18NService,
    private settingService: SettingsService,
    private shoppingService: ShoppingService,
    private aclService: ACLService,
    private titleService: TitleService,
    private authService: AuthService,
    private router: Router,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private httpClient: HttpClient,
  ) {
    iconSrv.addIcon(...ICONS_AUTO, ...ICONS);
  }

  async load(): Promise<any> {
    // only works with promises
    // https://github.com/angular/angular/issues/15088
    return new Promise(async (resolve, reject) => {
      // http
      // this.viaHttp(resolve, reject);
      // mock：请勿在生产环境中这么使用，viaMock 单纯只是为了模拟一些数据使脚手架一开始能正常运行
      await this.viaMockI18n(resolve, reject);
    });
  }

  private async viaMockI18n(resolve: any, reject: any): Promise<void> {
    this.httpClient.get(`assets/tmp/i18n/${this.i18n.defaultLang}.json`).subscribe(async (langData) => {
      this.translate.setTranslation(this.i18n.defaultLang, langData);
      this.translate.setDefaultLang(this.i18n.defaultLang);

      await this.viaMock(resolve, reject);
    });
  }

  private async viaMock(resolve: any, reject: any): Promise<void> {
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
    const accessToken = this.authService.decodeToken(this.tokenService.get().token);

    if (accessToken) {
      try {
        const acctInfo = await this.authService.getAcctInfo(Number(accessToken.sub));
        console.log('shit');
        console.log(acctInfo);
        this.authService.account = acctInfo;
        // Load shopping items from localStorage
        const shoppingItems = localStorage.getItem('shopping_cart');
        if (shoppingItems) {
          const shoppingInfo = JSON.parse(shoppingItems);
          console.log(this.authService.getUserName());
          if (this.authService.getUserName() === shoppingInfo.owner) {
            this.shoppingService.shoppingItems = shoppingInfo.shoppingItems || [];
          } else {
            this.shoppingService.shoppingItems = [];
          }
        } else {
          this.shoppingService.shoppingItems = [];
        }
      } catch (e) {
        this.notificationService.error('Account can not be found!', '');
        this.tokenService.clear();
        this.router.navigate(['/auth/login']);
      }
    }

    resolve({});
  }
}
