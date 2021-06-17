import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  Ads,
  AuthService,
  Booth,
  Job,
  MembershipType,
  ResourcePlan,
  ResourceService,
  ResourceType,
  ShoppingItem,
  ShoppingService,
} from '@core';
import { _HttpClient } from '@delon/theme';
import * as _ from 'lodash-es';

@Component({
  selector: 'app-shopping-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.less'],
})
export class ShoppingMarketComponent implements OnInit {
  membershipTypes: MembershipType[];
  resourceTypes: ResourceType[];
  disableMembershipSale = true;
  typeToResources = new Map();

  constructor(
    public router: Router,
    private http: _HttpClient,
    public shoppingService: ShoppingService,
    private authService: AuthService,
    private resourceService: ResourceService,
  ) {}

  ngOnInit(): void {
    this.resourceService.loadResourceTypes().subscribe((resourceTypes) => {
      this.resourceTypes = resourceTypes;
      this.resourceTypes.forEach((resourceType) => {
        resourceType.name = resourceType.tableName;
        resourceType.type = 'resource';
        this.typeToResources.set(this.resolveType(resourceType), this.resourceInstanceFrom(resourceType.name));
      });
    });

    this.authService.getAcctInfo().subscribe((acctInfo) => {
      console.log('>>>>>>>>>>>>>>>>>>>>>');
      console.log(acctInfo);
      if (!acctInfo.membership && !this.hasMembershipInShoppingCart(this.shoppingService.shoppingItems)) {
        this.disableMembershipSale = false;
      }
      this.loadMembershipTypes();
    });
  }

  loadMembershipTypes(): void {
    this.resourceService.loadMembershipTypes().subscribe((memberTypes) => {
      this.membershipTypes = memberTypes;
      this.membershipTypes.forEach((membershipType) => {
        membershipType.type = 'membership';
        let assignedResources = [];
        membershipType.resourceLimits.forEach((resourceLimit) => {
          assignedResources = assignedResources.concat(
            Array(resourceLimit.quantity).fill(this.resourceInstanceFrom(resourceLimit.resourceName)),
          );
        });
        this.typeToResources.set(this.resolveType(membershipType), assignedResources);
      });
    });
  }

  addToCart(merchandiseType: any): void {
    if (merchandiseType.type === 'membership') {
      this.disableMembershipSale = true;
    }
    this.shoppingService.shoppingItems.push(this.buildShoppingItem(merchandiseType));
  }

  viewShoppingCart(): void {
    this.router.navigateByUrl(this.shoppingService.hasResource() ? '/shopping/cart' : '/shopping/cart/empty');
  }

  private hasMembershipInShoppingCart(shoppingItems: ShoppingItem[]): boolean {
    const merchandises = shoppingItems.map((shoppingItem) => shoppingItem.merchandise);
    return merchandises.some((merchandise) => merchandise.type === 'membership');
  }

  private buildShoppingItem(merchandiseType: any): ShoppingItem {
    const shoppingItem: ShoppingItem = {
      merchandise: merchandiseType,
      price: merchandiseType.monthlyPrice,
      plan: ResourcePlan[ResourcePlan.MONTHLY],
      resource: [],
      valid: false,
    };

    this.populateResource(shoppingItem);
    return shoppingItem;
  }

  private populateResource(shoppingItem: ShoppingItem): void {
    const resources = _.cloneDeep(this.typeToResources.get(this.resolveType(shoppingItem.merchandise)));
    shoppingItem.resource = shoppingItem.resource.concat(resources);
  }

  private resolveType(merchandise: any): string {
    return merchandise.type + merchandise.name;
  }

  private resourceInstanceFrom(resourceName: string): any {
    switch (resourceName) {
      case 'ads':
        return new Ads();
      case 'booth':
        return new Booth();
      case 'job':
        return new Job();
      default:
        break;
    }
  }
}
