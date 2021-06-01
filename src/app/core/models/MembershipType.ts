export class MembershipType {
  id: number;
  name: string;
  description: string;
  resourceLimits: any;
  monthlyPrice: number;
  quarterlyPrice: number;
  yearlyPrice: number;
  type = 'membership';
}
