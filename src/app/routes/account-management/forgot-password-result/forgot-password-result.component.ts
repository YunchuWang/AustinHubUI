import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-account-management-forgot-password-result',
  templateUrl: './forgot-password-result.component.html',
})
export class AccountManagementForgotPasswordResultComponent implements OnInit {
  params = { email: '' };
  email = '';

  constructor(route: ActivatedRoute, public msg: NzMessageService) {
    this.params.email = this.email = route.snapshot.paramMap.get('email');
  }

  ngOnInit(): void {}
}
