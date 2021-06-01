export class ResourceType {
  id: number;
  name: string;
  tableName: string;
  description: string;
  resourceLimits: any;
  monthlyPrice: number;
  quarterlyPrice: number;
  yearlyPrice: number;
  type = 'resource';
}
