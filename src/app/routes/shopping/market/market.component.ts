import { Component, OnInit } from '@angular/core';
import { ResourceType, ShoppingItem } from '@core';
import { ShoppingService } from '@core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-shopping-market',
  templateUrl: './market.component.html',
})
export class ShoppingMarketComponent implements OnInit {
  memberResourceTypes: ResourceType[] = [
    {
      id: 4,
      tableName: 'membership',
      typeName: 'Basic',
      description: '1 Booth + 1 Ads',
      monthly: 42.99,
      quarterly: 119.99,
      yearly: 439.99,
    },
    {
      id: 5,
      tableName: 'membership',
      typeName: 'Advanced',
      description: '1 Booth + 1 Ads + 1 Job',
      monthly: 49.99,
      quarterly: 139.99,
      yearly: 509.99,
    },
  ];
  nonMemberResourceTypes: ResourceType[] = [
    {
      id: 1,
      tableName: 'booth',
      typeName: '',
      description: 'A resource to display your business information in clean text view',
      monthly: 12.99,
      quarterly: 34.99,
      yearly: 125.0,
    },
    {
      id: 2,
      tableName: 'ads',
      typeName: '',
      description: 'Ads lets you promote your business at home page with flexible customizations',
      monthly: 35.0,
      quarterly: 95.99,
      yearly: 390.99,
    },
    {
      id: 3,
      tableName: 'job',
      typeName: '',
      description: 'A hiring post to attract talents for your business',
      monthly: 9.99,
      quarterly: 24.99,
      yearly: 100.0,
    },
  ];

  constructor(private http: _HttpClient, private shoppingService: ShoppingService) {}

  ngOnInit(): void {}

  addToCart(resourceType: ResourceType): void {
    const newShoppingItem = this.buildShoppingItem(resourceType);
    if (newShoppingItem) {
      this.shoppingService.shoppingItems.push(newShoppingItem);
    }
  }

  private resolveShoppingItemType(resourceType: ResourceType): string {
    return resourceType.tableName.toLowerCase() + (resourceType.typeName ? '_' + resourceType.typeName.toLowerCase() : '');
  }

  private buildShoppingItem(resourceType: ResourceType): any {
    const shoppingItem: ShoppingItem = {
      type: this.resolveShoppingItemType(resourceType),
      price: resourceType.monthly,
      durationByMonths: 1,
      resource: [],
      resourceType,
    };

    switch (resourceType.tableName) {
      case 'ads':
        shoppingItem.resource.push({
          email: '',
          address: '',
          phone: '',
          link: '',
          description: '',
          category: '',
          imageUrl: '',
          type: 'ads',
        });
        break;
      case 'job':
        shoppingItem.resource.push({
          title: '',
          salary: '',
          description: '',
          type: 'job',
        });
        break;
      case 'booth':
        shoppingItem.resource.push({
          email: '',
          address: '',
          phone: '',
          link: '',
          description: '',
          category: '',
          type: 'booth',
        });
        break;
      case 'membership':
        if (!['Basic', 'Advanced'].includes(resourceType.typeName)) {
          return;
        }
        shoppingItem.resource.unshift(
          {
            email: '',
            address: '',
            phone: '',
            link: '',
            description: '',
            category: '',
            type: 'booth',
          },
          {
            email: '',
            address: '',
            phone: '',
            link: '',
            description: '',
            category: '',
            imageUrl: '',
            type: 'ads',
          },
        );
        if (resourceType.typeName === 'Basic') {
          shoppingItem.resource.unshift({
            type: 'basic membership',
            autoSubscribe: true,
          });
        } else if (resourceType.typeName === 'Advanced') {
          shoppingItem.resource.unshift(
            {
              type: 'advanced membership',
              autoSubscribe: true,
            },
            {
              title: '',
              salary: '',
              description: '',
            },
          );
        }
        break;
      default:
        return;
    }

    return shoppingItem;
  }
}
