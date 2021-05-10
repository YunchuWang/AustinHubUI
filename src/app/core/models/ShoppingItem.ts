import { ResourceType } from '@core';

export class ShoppingItem {
  type: string;
  price: number;
  durationByMonths: number;
  resource: any[];
  resourceType: ResourceType;
}
