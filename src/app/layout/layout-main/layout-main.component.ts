import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavTab } from '../../core/models/NavTab';
import { _HttpClient } from '@delon/theme';
import { MatSidenav } from '@angular/material/sidenav';
import { ResourceService } from '../../core/resource/resource.service';
import { CategoryType } from '../../core/models/CategoryType';
import { Category } from '../../core/models/Category';

@Component({
  selector: 'app-layout-main',
  templateUrl: './layout-main.component.html',
  styleUrls: ['./layout-main.component.less'],
})
export class LayoutMainComponent implements OnInit {
  @ViewChild(MatSidenav) sideBar: MatSidenav;
  @Input() hideSideMenu: boolean;
  @Input() categoryType: CategoryType = CategoryType.RESOURCE;
  categories: Category[];
  selectedCategory: string;
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
        this.setCategories(this.categoryType);
      }
    });

    this.resourceService.categoryChangeSubject.subscribe((category) => {
      this.selectedCategory = category;
    });
  }

  selectNavTab(tab: NavTab): void {
    this.setCategories(CategoryType.RESOURCE);
    if (tab.isResource) {
      this.router.navigate([tab.link, this.selectedCategory]);
    } else {
      this.router.navigate([tab.link]);
    }
  }

  setCategories(categoryType: CategoryType): void {
    this.categoryType = categoryType;
    if (categoryType === CategoryType.ACCOUNT) {
      this.categories = [
        { name: 'Account Info', link: 'info' },
        { name: 'My Booths', link: 'mybooths' },
        { name: 'My Jobs', link: 'myjobs' },
        { name: 'My Ads', link: 'myads' },
      ];
    } else if (categoryType === CategoryType.RESOURCE) {
      this.categories = [
        { name: 'restaurant', link: '/restaurant' },
        { name: 'gardening', link: '/gardening' },
        { name: 'accounting', link: '/accounting' },
      ];
    }
    this.selectedCategory = this.categories[0].name;
  }

  selectCategory(category: Category): void {
    this.selectedCategory = category.name;
    const path = this.router.url.split('/').slice(0, -1).join('/') + '/' + category.link;
    this.router.navigate([path]);
  }
}
