import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Booth, CategoryType, ResourceService } from '@core';
import { _HttpClient } from '@delon/theme';
import { PageList } from '../../core/models/Common';
import { NavigationService } from '../../core/services/navigation/navigation.service';
import { readUrl } from '../../core/utils/urlReader.util';

@Component({
  selector: 'app-booth-card',
  templateUrl: './booth-card.component.html',
  styles: [],
})
export class BoothCardComponent implements OnInit {
  @Input() booths: Booth[] = [];
  pageSize: number;
  totalCount: number;
  page: number;

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
        .loadBoothsByCategory(categoryName, CategoryType[CategoryType.RESC], query, this.page)
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
    const { query } = this.navigationService.getCategoryMap('Booth')[category.name];
    this.navigationService.changePage('Booth', category.name, newPage);
    this.router.navigate(['/booths', category.name], { queryParams: { query, page: newPage } });
    this.resourceService
      .loadBoothsByCategory(category.name, CategoryType[CategoryType.RESC], query, newPage)
      .subscribe((result: PageList<Booth>) => {
        this.page = newPage;
        this.booths = result.entries;
        this.pageSize = result.pageSize;
        this.totalCount = result.totalCount;
      });
  }
}
