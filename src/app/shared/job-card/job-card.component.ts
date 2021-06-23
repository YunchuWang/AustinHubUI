import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryType, ResourceService } from '@core';
import { Job } from '@core';
import { _HttpClient } from '@delon/theme';
import { PageList } from '../../core/models/Common';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styles: [],
})
export class JobCardComponent implements OnInit {
  @Input() jobs: Job[];

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
          .loadJobsByCategory(categoryName, CategoryType[CategoryType.RESC], query, page)
          .subscribe((result: PageList<Job>) => {
            this.jobs = result.entries;
          });
      });
    });
  }

  ngOnInit(): void {}

  isLoading(): boolean {
    return this.resourceService.jobHttpClient.loading;
  }

  withContent(): boolean {
    return this.jobs && this.jobs.length > 0;
  }
}
