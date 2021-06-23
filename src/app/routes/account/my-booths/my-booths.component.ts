import { Component, OnInit } from '@angular/core';
import { MyResourceType, ResourceService } from '@core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-account-my-booths',
  templateUrl: './my-booths.component.html',
  styleUrls: ['./my-booths.component.scss'],
})
export class AccountMyBoothsComponent implements OnInit {
  activeBooths: any[];
  inactiveBooths: any[];
  loading = true;

  constructor(private message: NzMessageService, private resourceService: ResourceService) {}

  ngOnInit(): void {
    this.loadBooths();
  }

  loadBooths(): void {
    this.loading = true;
    combineLatest([
      this.resourceService.loadMyResource(MyResourceType.BOOTHS, true),
      this.resourceService.loadMyResource(MyResourceType.BOOTHS, false),
    ]).subscribe(
      ([inactive, active]) => {
        this.inactiveBooths = inactive.map((row) => {
          return {
            ...row,
            category: row.categoryName,
            expirationDate: row.expirationTime,
          };
        });
        this.activeBooths = active.map((row) => {
          return {
            ...row,
            category: row.categoryName,
            expirationDate: row.expirationTime,
          };
        });

        this.loading = false;
      },
      (err) => console.error(err),
    );
  }

  onResourceStatusChanged(event: any): void {
    this.loadBooths();
  }
}
