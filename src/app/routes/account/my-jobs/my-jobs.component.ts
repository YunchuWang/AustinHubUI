import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { STColumn, STData } from '@delon/abc/st';

@Component({
  selector: 'app-account-my-jobs',
  templateUrl: './my-jobs.component.html',
})
export class AccountMyJobsComponent implements OnInit {
  activeJobs: any[] = [{ name: '聚丰园-后厨', expirationDate: '2025-02-01' }];

  inactiveJobs: any[] = [{ name: '聚丰园-洗碗', expirationDate: '2020-02-01' }];

  constructor(private http: _HttpClient) {}

  ngOnInit(): void {}
}
