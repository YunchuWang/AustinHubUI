import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { AuthService } from '../../core/auth/auth.service';
import { NavTab } from '../../core/models/NavTab';
import { ShoppingService } from '../../core/shopping/shopping.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [],
})
export class NavbarComponent implements OnInit {
  @Input() navTabs: NavTab[] = [];
  @Input() sideBar: MatSidenav;
  @Input() hideSideMenu: boolean;
  @Output() tabClicked: EventEmitter<NavTab> = new EventEmitter<NavTab>();
  private selectedNavTab = '';

  constructor(
    public router: Router,
    private authService: AuthService,
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
    this.tokenService.clear();
    this.shoppingService.saveShoppingItems();
    localStorage.removeItem('account');
    this.router.navigateByUrl('/auth/login').then(() => {
      this.router.navigateByUrl(this.router.url);
    });
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getUserName(): string {
    return localStorage.getItem('account');
  }

  viewShoppingCart(): void {
    this.router.navigateByUrl(this.shoppingService.hasResource() ? '/shopping/cart' : '/shopping/cart/empty');
  }
}
