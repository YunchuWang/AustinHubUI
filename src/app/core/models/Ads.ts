import { ResourceBase } from './ResourceBase';

export class Ads extends ResourceBase {
  name: string;
  phone: string;
  email: string;
  description: string;
  categoryId: number;
  webLink: string;
  imageLink: string;
  type = 'ads';

  constructor() {
    super();
    this.name = null;
    this.phone = null;
    this.email = null;
    this.description = null;
    this.categoryId = null;
    this.webLink = null;
    this.imageLink = null;
  }
}
