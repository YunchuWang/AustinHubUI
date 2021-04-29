import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { MyResource } from '../../../core/models/MyResource';

@Component({
  selector: 'app-account-my-booths',
  templateUrl: './my-booths.component.html',
  styleUrls: ['./my-booths.component.scss'],
})
export class AccountMyBoothsComponent implements OnInit {
  constructor(private message: NzMessageService) {}

  activeBooths: any[] = [{ name: '八仙堂', expirationDate: '2025-02-01', category: 'restaurant', phone: '412-423-1231' }];

  inactiveBooths: any[] = [{ name: '你好咖啡', expirationDate: '2020-02-01', category: 'restaurant', phone: '412-423-1232' }];

  ngOnInit(): void {}
}
