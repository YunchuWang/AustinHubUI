import { Component, Inject, OnInit } from '@angular/core';
import { AuthService, I18NService, ResourceService } from '@core';
import { ALAIN_I18N_TOKEN } from '@delon/theme';
import { TranslateService } from '@ngx-translate/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-account-info',
  templateUrl: './info.component.html',
})
export class AccountInfoComponent implements OnInit {
  userName: string;
  email: string;
  membership: any;
  preferredLanguage: string;

  constructor(
    public authService: AuthService,
    public translate: TranslateService,
    @Inject(ALAIN_I18N_TOKEN) private i18n: I18NService,
    public resourceService: ResourceService,
    public notificationService: NzNotificationService,
  ) {
    this.membership = this.authService.getMembership();
    this.preferredLanguage = this.authService.getPreferredLang();
  }

  ngOnInit(): void {
    this.userName = this.authService.getUserName();
    this.email = this.authService.getEmail();
  }

  onLangChange(event: any): void {
    console.log(event.value);
    this.preferredLanguage = event.value;
    this.authService.updatePreference({ lang: this.preferredLanguage }).subscribe((value) => {
      this.i18n.use(this.preferredLanguage);
    });
  }
}
