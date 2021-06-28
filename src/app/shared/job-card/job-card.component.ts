import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryType, ResourceService } from '@core';
import { Job } from '@core';
import { _HttpClient } from '@delon/theme';
import { PageList } from '../../core/models/Common';
import { OrderBy } from '../../core/models/NavigationEntry';
import { NavigationService } from '../../core/services/navigation/navigation.service';
import { readUrl } from '../../core/utils/urlReader.util';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.less'],
})
export class JobCardComponent implements OnInit {
  @Input() jobs: Job[];
  page: number;
  pageSize: number;
  totalCount: number;
  searchQuery: string;
  orderBy: OrderBy;

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
      const { page, query, orderBy } = readUrl(this.router.url);
      this.page = parseInt(page, 10) || 0;
      this.searchQuery = query;
      this.orderBy = orderBy as OrderBy;
      this.resourceService
        .loadJobsByCategory(categoryName, CategoryType[CategoryType.RESC], this.searchQuery, this.page, this.orderBy)
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
    const category = this.navigationService.getSelectedCategory('Jobs');
    const { query, orderBy } = this.navigationService.getCategoryMap('Jobs')[category.name];
    this.navigationService.changePage('Jobs', category.name, newPage);
    this.router.navigate(['/jobs', category.name], { queryParams: { query, page: newPage, orderBy } });
    this.page = newPage;
    this.searchQuery = query;
    this.orderBy = orderBy;
    this.resourceService
      .loadJobsByCategory(category.name, CategoryType[CategoryType.RESC], query, newPage, orderBy)
      .subscribe((result: PageList<Job>) => {
        this.jobs = result.entries;
        this.pageSize = result.pageSize;
        this.totalCount = result.totalCount;
      });
  }

  handleQueryChange(): void {
    const category = this.navigationService.getSelectedCategory('Jobs');
    this.navigationService.updateSelectedCategoryAndParams('Jobs', category, 0, this.searchQuery, this.orderBy);
    this.router.navigate(['/jobs', category.name], { queryParams: { query: this.searchQuery, page: 0, orderBy: this.orderBy } });
    this.page = 0;
    this.resourceService
      .loadJobsByCategory(category.name, CategoryType[CategoryType.RESC], this.searchQuery, 0, this.orderBy)
      .subscribe((result: PageList<Job>) => {
        this.jobs = result.entries;
        this.pageSize = result.pageSize;
        this.totalCount = result.totalCount;
      });
  }

  handleOrderByChange(event: string): void {
    const category = this.navigationService.getSelectedCategory('Jobs');
    this.orderBy = event as OrderBy;
    this.navigationService.updateSelectedCategoryAndParams('Jobs', category, 0, this.searchQuery, this.orderBy);
    this.router.navigate(['/jobs', category.name], { queryParams: { query: this.searchQuery, page: 0, orderBy: this.orderBy } });
    this.page = 0;
    this.resourceService
      .loadJobsByCategory(category.name, CategoryType[CategoryType.RESC], this.searchQuery, 0, this.orderBy)
      .subscribe((result: PageList<Job>) => {
        this.jobs = result.entries;
        this.pageSize = result.pageSize;
        this.totalCount = result.totalCount;
      });
  }
}
