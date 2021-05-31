export class Ads {
  name: string;
  phone: string;
  email: string;
  description: string;
  categoryId: number;
  webLink: string;
  imageLink: string;
  type = 'ads';

  constructor() {
    this.name = null;
    this.phone = null;
    this.email = null;
    this.description = null;
    this.categoryId = null;
    this.webLink = null;
    this.imageLink = null;
  }
}
