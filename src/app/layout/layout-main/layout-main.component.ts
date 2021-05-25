import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { Category } from '../../core/models/Category';
import { CategoryType } from '../../core/models/CategoryType';
import { NavTab } from '../../core/models/NavTab';
import { ResourceService } from '../../core/resource/resource.service';

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
    private _httpClient: _HttpClient,
    public resourceService: ResourceService,
  ) {}

  ngOnInit(): void {
    this.navTabs = [
      { name: 'Booth', link: '/booths', isResource: true },
      {
        name: 'Jobs',
        link: '/jobs',
        isResource: true,
      },
      { name: 'Contact Us', link: '/contact', isResource: false },
      { name: 'Shopping', link: '/shopping/market', isResource: false },
    ];
    this.activatedRoute.data.subscribe((data) => {
      this.hideSideMenu = data.hideSideMenu;
      if (!this.hideSideMenu) {
        this.categoryType = data.categoryType;
        this.setCategories(this.categoryType).subscribe((categories) => {
          this.categories = categories;
          this.selectedCategory = this.categories[0];
        });
      }
    });
  }

  selectNavTab(tab: NavTab): void {
    this.setCategories(CategoryType.RESC).subscribe((categories) => {
      this.categories = categories;
      this.selectedCategory = this.categories[0];
      if (tab.isResource) {
        this.router.navigate([tab.link, this.selectedCategory.name]);
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
    this.selectedCategory = category;
    const path = this.router.url.split('/').slice(0, -1).join('/') + '/' + category.link;
    this.router.navigate([path]);
  }
}
