export class Booth {
  name: string;
  phone: string;
  email: string;
  address: string;
  description: string;
  categoryId: number;
  link: string;
  type = 'booth';

  constructor() {
    this.name = null;
    this.phone = null;
    this.email = null;
    this.address = null;
    this.description = null;
    this.categoryId = null;
    this.link = null;
  }
}
