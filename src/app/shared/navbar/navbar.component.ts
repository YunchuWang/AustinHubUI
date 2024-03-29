import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService, ShoppingService } from '@core';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { NavTab } from '../../core/models/NavTab';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less'],
})
export class NavbarComponent implements OnInit {
  @Input() navTabs: NavTab[] = [];
  @Input() sideBar: MatSidenav;
  @Input() hideSideMenu: boolean;
  @Output() tabClicked: EventEmitter<NavTab> = new EventEmitter<NavTab>();
  selectedNavTab = '';
  shoppingWritePermission = {
    name: 'shopping',
    allowed: 'WRITE',
  };

  constructor(
    public router: Router,
    public authService: AuthService,
    public shoppingService: ShoppingService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
  ) {
    this.router.events.subscribe((val) => {
      this.navTabs.forEach((navTab) => {
        if (this.router.url.startsWith(navTab.link)) {
          this.selectedNavTab = navTab.name;
        }
      });
    });
  }

  ngOnInit(): void {
    if (!this.hideSideMenu) {
      this.sideBar.toggle(true);
    } else {
      this.sideBar.toggle(false);
    }
  }

  identifyNav(nav: NavTab): string {
    return nav.name;
  }

  selectNavTab(navTab: NavTab): void {
    this.selectedNavTab = navTab.name;
    this.tabClicked.emit(navTab);
  }

  logout(): void {
    this.shoppingService.saveShoppingItems();
    this.tokenService.clear();
    this.authService.removeAccountInfo();
    localStorage.removeItem('account');
    this.router.navigateByUrl('/auth/login').then(() => {
      this.router.navigateByUrl(this.router.url);
    });
  }

  viewShoppingCart(): void {
    this.router.navigateByUrl(this.shoppingService.hasResource() ? '/shopping/cart' : '/shopping/cart/empty');
  }
}
