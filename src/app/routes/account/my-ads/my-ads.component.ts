import { Component, OnInit } from '@angular/core';
import { MyResourceType, ResourceService } from '@core';
import { _HttpClient } from '@delon/theme';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-account-my-ads',
  templateUrl: './my-ads.component.html',
})
export class AccountMyAdsComponent implements OnInit {
  activeAds: any[];
  inactiveAds: any[];
  loading = true;

  ngOnInit(): void {}

  constructor(private http: _HttpClient, private resourceService: ResourceService) {
    this.loadAds();
  }

  loadAds(): void {
    this.loading = true;
    combineLatest([
      this.resourceService.loadMyResource(MyResourceType.ADS, true),
      this.resourceService.loadMyResource(MyResourceType.ADS, false),
    ]).subscribe(
      ([inactive, active]) => {
        this.inactiveAds = inactive.map((row) => {
          return {
            ...row,
            category: row.categoryName,
            expirationDate: row.expirationTime,
          };
        });
        this.activeAds = active.map((row) => {
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
    this.loadAds();
  }
}
