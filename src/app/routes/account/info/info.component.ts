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

  constructor(public authService: AuthService, public resourceService: ResourceService, public notificationService: NzNotificationService) {
    this.membership = this.authService.getMembership();
  }

  ngOnInit(): void {
    this.userName = this.authService.getUserName();
    this.email = this.authService.getEmail();
  }
}
