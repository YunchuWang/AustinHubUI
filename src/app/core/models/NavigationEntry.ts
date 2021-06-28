import { Category } from './Category';

export type OrderBy = 'CREATED_TIMESTAMP' | 'TITLE';

export type NavigationEntry = {
  page: number;
  query: string;
  orderBy: OrderBy;
};

export interface CategoryMap {
  [name: string]: NavigationEntry;
}

export interface NavTabMap {
  [name: string]: {
    selectedCategory: Category;
    categoryMap: CategoryMap;
    isInitialized: boolean;
  };
}
