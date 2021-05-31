export class Job {
  name: string;
  phone: string;
  contact: string;
  salary: string;
  address: string;
  companyLink: string;
  description: string;
  categoryId: number;
  resourceId: number;
  type = 'job';

  constructor() {
    this.name = null;
    this.phone = null;
    this.contact = null;
    this.salary = null;
    this.address = null;
    this.companyLink = null;
    this.description = null;
    this.categoryId = null;
    this.resourceId = null;
  }
}
