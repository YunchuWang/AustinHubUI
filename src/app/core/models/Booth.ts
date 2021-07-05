import { Category } from './Category';
import { Resource } from './Resource';
import { ResourceBase } from './ResourceBase';

export class Booth extends ResourceBase {
  name: string;
  phone: string;
  email: string;
  address: string;
  description: string;
  category: Category;
  resource: Resource;
  link: string;
  type = 'booth';

  constructor() {
    super();
    this.name = null;
    this.phone = null;
    this.email = null;
    this.address = null;
    this.description = null;
    this.category = null;
    this.resource = null;
    this.link = null;
  }
}
