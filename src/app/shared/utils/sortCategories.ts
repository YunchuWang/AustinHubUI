import { Category } from '../../core/models/Category';

export function sortCategories(a: Category, b: Category): number {
  if (a.name === 'all') {
    return -1;
  }
  return 1;
}
