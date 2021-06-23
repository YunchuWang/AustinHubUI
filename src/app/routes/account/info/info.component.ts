import { Component, OnInit } from '@angular/core';
import { AuthService, ResourceService } from '@core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-account-info',
  templateUrl: './info.component.html',
})
export class AccountInfoComponent implements OnInit {
  userName: string;
  email: string;
  membership: any;
  autoSubscribeBtnDisabled: boolean;

  constructor(public authService: AuthService, public resourceService: ResourceService, public notificationService: NzNotificationService) {
    this.autoSubscribeBtnDisabled = false;
    this.authService.getAcctInfo().subscribe((account) => {
      console.log(account);
      this.membership = account.membership;
    });
  }

  ngOnInit(): void {
    this.userName = localStorage.getItem('account');
    this.email = localStorage.getItem('email');
  }

  /**
   * On auto subscribe change, a timer starts to disable button for some time for preventing
   * switching around too rapidly.
   */
  onAutoSubscribeChange(event: any): void {
    this.autoSubscribeBtnDisabled = true;
    setInterval(() => {
      this.autoSubscribeBtnDisabled = false;
    }, 8000);
  }
}
