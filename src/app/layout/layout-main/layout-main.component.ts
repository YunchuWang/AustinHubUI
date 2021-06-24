import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryType } from '@core';
import { ResourceService } from '@core';
import { Observable } from 'rxjs';
import { Category } from '../../core/models/Category';
import { NavTab } from '../../core/models/NavTab';
import { NavigationService } from '../../core/services/navigation/navigation.service';

@Component({
  selector: 'app-layout-main',
  templateUrl: './layout-main.component.html',
  styleUrls: ['./layout-main.component.less'],
})
export class LayoutMainComponent implements OnInit {
  @ViewChild(MatSidenav) sideBar: MatSidenav;
  @Input() hideSideMenu: boolean;
  @Input() categoryType: CategoryType = CategoryType.RESC;
  categories: Category[];
  selectedCategory: Category;
  navTabs: NavTab[] = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    private router: Router,
    public resourceService: ResourceService,
    public navigationService: NavigationService,
  ) {}

  ngOnInit(): void {
    this.navTabs = [
      { name: 'Booth', link: '/booths', isResource: true },
      { name: 'Jobs', link: '/jobs', isResource: true },
      { name: 'Contact Us', link: '/contact', isResource: false },
      { name: 'Shopping', link: '/shopping/market', isResource: false },
    ];
    this.activatedRoute.data.subscribe((data) => {
      this.hideSideMenu = data.hideSideMenu;
      if (!this.hideSideMenu) {
        this.categoryType = data.categoryType;
        this.setCategories(this.categoryType).subscribe((categories) => {
          this.categories = categories;
          const tabName = this.getTabName();
          this.navigationService.initializeCategoryMap(tabName, categories);
          const url: string = this.router.url;
          const paramsMap = { query: '', page: 0 };
          const urlParams = url.split('?')[1]?.split('&');
          if (urlParams) {
            urlParams.forEach((urlParam) => {
              const contents = urlParam.split('=');
              if (contents && contents.length >= 1) {
                paramsMap[contents[0]] = contents.length === 2 ? contents[1] : '';
              }
            });
          }
          const { page, query } = paramsMap;
          const category = categories.filter((c) => url.includes(c.link))[0];
          this.selectedCategory = category;
          this.navigationService.updateSelectedCategoryAndParams(tabName, category, page, query);
        });
      }
    });
  }

  selectNavTab(tab: NavTab): void {
    this.setCategories(CategoryType.RESC).subscribe((categories) => {
      this.categories = categories;
      this.navigationService.initializeCategoryMap(tab.name, categories);
      if (tab.isResource) {
        const selectedCategory = this.navigationService.getSelectedCategory(tab.name);
        const { query, page } = this.navigationService.getCategoryMap(tab.name)[selectedCategory.name];
        this.selectedCategory = selectedCategory;
        this.router.navigate([tab.link, selectedCategory.name], { queryParams: { query, page } });
      } else {
        this.router.navigate([tab.link]);
      }
    });
  }

  setCategories(categoryType: CategoryType): Observable<any> {
    this.categoryType = categoryType;
    return this.resourceService.loadCategories(categoryType);
  }

  selectCategory(category: Category): void {
    const tabName = this.getTabName();
    this.navigationService.updateSelectedCategory(tabName, category);
    this.selectedCategory = category;
    const { query, page } = this.navigationService.getCategoryMap(tabName)[category.name];
    const path = this.router.url.split('/').slice(0, -1).join('/');
    this.router.navigate([path, category.name], { queryParams: { query, page } });
  }

  getTabName(): string {
    if (this.router.url.startsWith('/booths')) {
      return 'Booth';
    } else if (this.router.url.startsWith('/jobs')) {
      return 'Jobs';
    } else {
      return 'Account';
    }
  }
}
