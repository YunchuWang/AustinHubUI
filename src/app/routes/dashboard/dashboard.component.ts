import { Component, OnInit } from '@angular/core';
import { Ads } from '@core';
import { ResourceService } from '@core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  ads: Ads[];
  numOfRows = 0;
  numOfCols = 3;

  constructor(public resourceService: ResourceService) {}

  ngOnInit(): void {
    this.resourceService.loadAllAds().subscribe((ads) => {
      this.ads = ads;
      this.setAdsGrids(ads);
    });
  }

  setAdsGrids(ads: Ads[]): void {
    this.numOfRows = Math.ceil(ads.length / this.numOfCols);
  }

  genNumArr(num: number): number[] {
    return Array.from(Array(num).keys());
  }

  calcGridArrIndex(col: number, row: number): number {
    return row * this.numOfCols + col;
  }
}
