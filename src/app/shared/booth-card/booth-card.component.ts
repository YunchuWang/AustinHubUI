import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Booth, CategoryType, ResourceService } from '@core';
import { _HttpClient } from '@delon/theme';
import { PageList } from '../../core/models/Common';

@Component({
  selector: 'app-booth-card',
  templateUrl: './booth-card.component.html',
  styles: [],
})
export class BoothCardComponent implements OnInit {
  @Input() booths: Booth[] = [];
  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private _httpClient: _HttpClient,
    private resourceService: ResourceService,
  ) {
    activatedRoute.params.subscribe((data) => {
      const categoryName = this.activatedRoute.snapshot.paramMap.get('category');
      if (!categoryName) {
        return;
      }
      activatedRoute.queryParamMap.subscribe((queryParamMap) => {
        // @ts-ignore
        const { page, query } = queryParamMap.params;
        this.resourceService
          .loadBoothsByCategory(categoryName, CategoryType[CategoryType.RESC], query, page)
          .subscribe((result: PageList<Booth>) => {
            this.booths = result.entries;
          });
      });
    });
  }

  ngOnInit(): void {}

  isLoading(): boolean {
    return this.resourceService.jobHttpClient.loading;
  }

  withContent(): boolean {
    return this.booths && this.booths.length > 0;
  }
}
