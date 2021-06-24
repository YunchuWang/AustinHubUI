import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { AuthService } from '@core';
import { PERMISSION_ORDER_MAP } from '../core/constants/PermissionConstants';
import { Permission } from '../core/models/Role';

export type PermissionAllowed = {
  name: string;
  allowed: Permission;
};

@Directive({
  selector: '[appHasPermission]',
})
export class HasPermissionDirective implements OnInit {
  @Input() appHasPermission: PermissionAllowed;

  constructor(private el: ElementRef, private authService: AuthService) {}

  ngOnInit(): void {
    const permissionName = this.appHasPermission.name;
    const permissionAllowed = this.appHasPermission.allowed;

    let permissionOwned;
    if (!this.authService.isLoggedIn()) {
      permissionOwned = 'NONE';
    } else {
      permissionOwned = this.authService.getRole()[permissionName];
    }

    if (PERMISSION_ORDER_MAP[permissionOwned] < PERMISSION_ORDER_MAP[permissionAllowed]) {
      this.el.nativeElement.style.display = 'none';
    }
  }
}
