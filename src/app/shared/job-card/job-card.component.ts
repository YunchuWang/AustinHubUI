import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryType, ResourceService } from '@core';
import { Job } from '@core';
import { _HttpClient } from '@delon/theme';
import { PageList } from '../../core/models/Common';
import { NavigationService } from '../../core/services/navigation/navigation.service';
import { readUrl } from '../../core/utils/urlReader.util';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styles: [],
})
export class JobCardComponent implements OnInit {
  @Input() jobs: Job[];
  page: number;
  pageSize: number;
  totalCount: number;

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public navigationService: NavigationService,
    private _httpClient: _HttpClient,
    private resourceService: ResourceService,
  ) {
    activatedRoute.params.subscribe((data) => {
      const categoryName = this.activatedRoute.snapshot.paramMap.get('category');
      if (!categoryName) {
        return;
      }
      const { page, query } = readUrl(this.router.url);
      this.page = parseInt(page, 10) || 0;
      this.resourceService
        .loadJobsByCategory(categoryName, CategoryType[CategoryType.RESC], query, this.page)
        .subscribe((result: PageList<Job>) => {
          this.jobs = result.entries;
          this.pageSize = result.pageSize;
          this.totalCount = result.totalCount;
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

  handlePageChange(event: number): void {
    const newPage: number = event - 1;
    const category = this.navigationService.getSelectedCategory('Job');
    const { query } = this.navigationService.getCategoryMap('Job')[category.name];
    this.navigationService.changePage('Job', category.name, newPage);
    this.router.navigate(['/jobs', category.name], { queryParams: { query, page: newPage } });
    this.resourceService
      .loadJobsByCategory(category.name, CategoryType[CategoryType.RESC], query, newPage)
      .subscribe((result: PageList<Job>) => {
        this.page = newPage;
        this.jobs = result.entries;
        this.pageSize = result.pageSize;
        this.totalCount = result.totalCount;
      });
  }
}
