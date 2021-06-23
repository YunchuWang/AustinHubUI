export type NavTabName = 'Booth' | 'Jobs' | 'Contact Us' | 'Shopping';

export type PageList<T> = {
  page: number;
  pageSize: number;
  totalCount: number;
  entries: T[];
};
