import { Category } from './Category';
import { Resource } from './Resource';
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
  resource: Resource;
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
    this.resource = null;
  }
}
