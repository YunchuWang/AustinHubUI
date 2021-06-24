export class Role {
  id: number;
  admin: Permission;
  ads: Permission;
  auth: Permission;
  booth: Permission;
  job: Permission;
  myaccount: Permission;
  name: Permission;
  shopping: Permission;
}

export type Permission = 'NONE' | 'READ' | 'WRITE';
