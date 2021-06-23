import { Category } from './Category';

export type NavigationEntry = {
  page: number;
  query: string;
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
