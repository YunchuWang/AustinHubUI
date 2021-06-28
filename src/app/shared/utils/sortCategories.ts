/**
 * 转化成RMB元字符串
 * @param digits 当数字类型时，允许指定小数点后数字的个数，默认2位小数
 */
import { Category } from '../../core/models/Category';

export function sortCategories(a: Category, b: Category): number {
  if (a.name === 'all') {
    return -1;
  }
  return 1;
}
