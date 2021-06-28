import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Booth, CategoryType, ResourceService } from '@core';
import { _HttpClient } from '@delon/theme';
import { PageList } from '../../core/models/Common';
import { OrderBy } from '../../core/models/NavigationEntry';
import { NavigationService } from '../../core/services/navigation/navigation.service';
import { readUrl } from '../../core/utils/urlReader.util';

@Component({
  selector: 'app-booth-card',
  templateUrl: './booth-card.component.html',
  styleUrls: ['./booth-card.component.less'],
})
export class BoothCardComponent implements OnInit {
  @Input() booths: Booth[] = [];
  pageSize: number;
  totalCount: number;
  page: number;
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
        .loadBoothsByCategory(categoryName, CategoryType[CategoryType.RESC], this.searchQuery, this.page, this.orderBy)
        .subscribe((result: PageList<Booth>) => {
          this.booths = result.entries;
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
    return this.booths && this.booths.length > 0;
  }

  handlePageChange(event: number): void {
    const newPage: number = event - 1;
    const category = this.navigationService.getSelectedCategory('Booth');
    const { query, orderBy } = this.navigationService.getCategoryMap('Booth')[category.name];
    this.navigationService.changePage('Booth', category.name, newPage);
    this.router.navigate(['/booths', category.name], { queryParams: { query, page: newPage, orderBy } });
    this.page = newPage;
    this.searchQuery = query;
    this.orderBy = orderBy;
    this.resourceService
      .loadBoothsByCategory(category.name, CategoryType[CategoryType.RESC], query, newPage, orderBy)
      .subscribe((result: PageList<Booth>) => {
        this.booths = result.entries;
        this.pageSize = result.pageSize;
        this.totalCount = result.totalCount;
      });
  }

  handleQueryChange(): void {
    const category = this.navigationService.getSelectedCategory('Booth');
    this.navigationService.updateSelectedCategoryAndParams('Booth', category, 0, this.searchQuery, this.orderBy);
    this.router.navigate(['/booths', category.name], { queryParams: { query: this.searchQuery, page: 0, orderBy: this.orderBy } });
    this.page = 0;
    this.resourceService
      .loadBoothsByCategory(category.name, CategoryType[CategoryType.RESC], this.searchQuery, 0, this.orderBy)
      .subscribe((result: PageList<Booth>) => {
        this.booths = result.entries;
        this.pageSize = result.pageSize;
        this.totalCount = result.totalCount;
      });
  }

  handleOrderByChange(event: string): void {
    const category = this.navigationService.getSelectedCategory('Booth');
    this.orderBy = event as OrderBy;
    this.navigationService.updateSelectedCategoryAndParams('Booth', category, 0, this.searchQuery, this.orderBy);
    this.router.navigate(['/booths', category.name], { queryParams: { query: this.searchQuery, page: 0, orderBy: this.orderBy } });
    this.page = 0;
    this.resourceService
      .loadBoothsByCategory(category.name, CategoryType[CategoryType.RESC], this.searchQuery, 0, this.orderBy)
      .subscribe((result: PageList<Booth>) => {
        this.booths = result.entries;
        this.pageSize = result.pageSize;
        this.totalCount = result.totalCount;
      });
  }
}
