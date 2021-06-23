import { Category } from './Category';
import { ResourceBase } from './ResourceBase';

export class Job extends ResourceBase {
  name: string;
  phone: string;
  contact: string;
  salary: string;
  address: string;
  companyLink: string;
  description: string;
  category: Category;
  resourceId: number;
  type = 'job';

  constructor() {
    super();
    this.name = null;
    this.phone = null;
    this.contact = null;
    this.salary = null;
    this.address = null;
    this.companyLink = null;
    this.description = null;
    this.category = null;
    this.resourceId = null;
  }
}
