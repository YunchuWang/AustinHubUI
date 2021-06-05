import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ads, ResourceService } from '@core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-ads-card',
  templateUrl: './ads-card.component.html',
  styles: [],
})
export class AdsCardComponent implements OnInit {
  @Input() adsList: Ads[] = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private _httpClient: _HttpClient,
    private resourceService: ResourceService,
  ) {}

  ngOnInit(): void {}
}
