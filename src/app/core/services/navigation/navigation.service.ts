import { Injectable } from '@angular/core';
import { Category } from '../../models/Category';
import { CategoryMap, NavTabMap, OrderBy } from '../../models/NavigationEntry';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  navTabMap: NavTabMap;

  constructor() {
    this.navTabMap = {
      Booth: {
        selectedCategory: { id: '1', displayName: 'Restaurant', name: 'restaurant', link: '/restaurant' },
        categoryMap: {} as CategoryMap,
        isInitialized: false,
      },
      Jobs: {
        selectedCategory: { id: '1', displayName: 'Restaurant', name: 'restaurant', link: '/restaurant' },
        categoryMap: {} as CategoryMap,
        isInitialized: false,
      },
      Account: {
        selectedCategory: { id: '7', displayName: 'Account Info', name: 'account-info', link: 'info' },
        categoryMap: {} as CategoryMap,
        isInitialized: false,
      },
    };
  }

  initializeCategoryMap(name: string, categories: Category[]): void {
    if (!this.navTabMap[name]) {
      return;
    }
    const { isInitialized } = this.navTabMap[name];
    if (!isInitialized) {
      const categoryMap: CategoryMap = {};
      categories.forEach((m) => {
        categoryMap[m.name] = { page: 0, query: '', orderBy: 'TITLE' };
      });
      const { selectedCategory } = this.navTabMap[name];
      this.navTabMap[name] = {
        selectedCategory,
        categoryMap,
        isInitialized: true,
      };
    }
  }

  updateSelectedCategory(name: string, selectedCategory: Category): void {
    const { categoryMap, isInitialized } = this.navTabMap[name];
    this.navTabMap[name] = {
      selectedCategory,
      categoryMap,
      isInitialized,
    };
  }

  updateSelectedCategoryAndParams(name: string, selectedCategory: Category, page: number, query: string, orderBy: OrderBy): void {
    const { categoryMap, isInitialized } = this.navTabMap[name];
    categoryMap[selectedCategory.name] = { page, query, orderBy };
    this.navTabMap[name] = {
      selectedCategory,
      categoryMap,
      isInitialized,
    };
  }

  getSelectedCategory(name: string): Category {
    return this.navTabMap[name].selectedCategory;
  }

  getCategoryMap(name: string): CategoryMap {
    return this.navTabMap[name].categoryMap;
  }

  changePage(name: string, categoryName: string, page: number): void {
    const { selectedCategory, categoryMap, isInitialized } = this.navTabMap[name];
    const { query, orderBy } = categoryMap[categoryName];
    categoryMap[categoryName] = { page, query, orderBy };
    this.navTabMap[name] = {
      selectedCategory,
      categoryMap,
      isInitialized,
    };
  }

  updateQuery(name: string, categoryName: string, query: string): void {
    const { selectedCategory, categoryMap, isInitialized } = this.navTabMap[name];
    const { page, orderBy } = categoryMap[categoryName];
    categoryMap[categoryName] = { page, query, orderBy };
    this.navTabMap[name] = {
      selectedCategory,
      categoryMap,
      isInitialized,
    };
  }

  changeOrderBy(name: string, categoryName: string, orderBy: OrderBy): void {
    const { selectedCategory, categoryMap, isInitialized } = this.navTabMap[name];
    const { page, query } = categoryMap[categoryName];
    categoryMap[categoryName] = { page, query, orderBy };
    this.navTabMap[name] = {
      selectedCategory,
      categoryMap,
      isInitialized,
    };
  }
}
