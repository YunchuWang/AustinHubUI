import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-account-management-register-result',
  templateUrl: './register-result.component.html',
})
export class AccountManagementRegisterResultComponent implements OnInit {
  params = { email: '' };
  email = '';
  constructor(private route: ActivatedRoute, public msg: NzMessageService) {
    this.params.email = this.route.snapshot.paramMap.get('email');
  }

  ngOnInit(): void {}
}
