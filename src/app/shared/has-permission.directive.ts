import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
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
export class HasPermissionDirective implements AfterViewInit {
  @Input() appHasPermission: PermissionAllowed;
  @Input() isLoggedIn: boolean;

  constructor(private el: ElementRef, private authService: AuthService) {}

  ngAfterViewInit(): void {
    const permissionName = this.appHasPermission?.name;
    const permissionAllowed = this.appHasPermission?.allowed;

    let permissionOwned;
    console.log('jj');
    if (!this.isLoggedIn) {
      permissionOwned = 'NONE';
    } else {
      const role = this.authService.getRole();
      permissionOwned = !role ? 'NONE' : role[permissionName];
    }

    if (PERMISSION_ORDER_MAP[permissionOwned] < PERMISSION_ORDER_MAP[permissionAllowed]) {
      this.el.nativeElement.style.display = 'none';
    }
  }
}
