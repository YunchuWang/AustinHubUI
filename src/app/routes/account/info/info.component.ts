import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core';

@Component({
  selector: 'app-account-info',
  templateUrl: './info.component.html',
})
export class AccountInfoComponent implements OnInit {
  userName: string;
  email: string;
  membership: any;

  constructor(public authService: AuthService) {
    this.authService.getAcctInfo().subscribe((account) => {
      console.log(account);
      this.membership = account.membership;
    });
  }

  ngOnInit(): void {
    this.userName = localStorage.getItem('account');
    this.email = localStorage.getItem('email');
  }
}
