import { AfterViewInit, Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { PERMISSION_ORDER_MAP } from '../core/constants/PermissionConstants';
import { Permission } from '../core/models/Role';

export type PermissionAllowed = {
  name: string;
  allowed: Permission;
};

@Directive({
  selector: '[appHasPermission]',
})
export class HasPermissionDirective implements AfterViewInit, OnChanges {
  constructor(private el: ElementRef) {}
  @Input() appHasPermission: PermissionAllowed;
  @Input() userRole: any;

  ngAfterViewInit(): void {
    // const permissionName = this.appHasPermission?.name;
    // const permissionAllowed = this.appHasPermission?.allowed;
    // let permissionOwned;
    // if (!this.userRole) {
    //   permissionOwned = 'NONE';
    // } else {
    //   permissionOwned = this.userRole[permissionName];
    // }
    //
    // if (PERMISSION_ORDER_MAP[permissionOwned] < PERMISSION_ORDER_MAP[permissionAllowed]) {
    //   this.el.nativeElement.style.display = 'none';
    //   console.log(permissionOwned);
    // }
  }

  ngOnChanges(changes: any): void {
    this.userRole = changes.userRole.currentValue;
    const permissionName = this.appHasPermission?.name;
    const permissionAllowed = this.appHasPermission?.allowed;
    let permissionOwned;
    if (!this.userRole) {
      permissionOwned = 'NONE';
    } else {
      permissionOwned = this.userRole[permissionName];
    }

    if (PERMISSION_ORDER_MAP[permissionOwned] < PERMISSION_ORDER_MAP[permissionAllowed]) {
      this.el.nativeElement.style.display = 'none';
    } else {
      this.el.nativeElement.style.display = 'flex';
    }
  }
}
