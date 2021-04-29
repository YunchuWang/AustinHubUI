import { Component, Input, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { STColumn, STData } from '@delon/abc/st';

@Component({
  selector: 'app-account-my-ads',
  templateUrl: './my-ads.component.html',
})
export class AccountMyAdsComponent implements OnInit {
  activeAds: any[] = [{ name: '美丽美容', expirationDate: '2025-02-01' }];

  inactiveAds: any[] = [{ name: '你好咖啡', expirationDate: '2020-02-01' }];

  constructor(private http: _HttpClient) {}

  ngOnInit(): void {}
}
