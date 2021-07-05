import { Component, OnInit } from '@angular/core';
import { AuthService, MembershipType, ResourcePlan, ResourceService, ResourceType, ShoppingService } from '@core';
import { MakePaymentFormComponent } from '@shared';
import * as _ from 'lodash-es';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { combineLatest } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-renew',
  templateUrl: './renew.component.html',
  styleUrls: ['./renew.component.less'],
})
export class RenewComponent implements OnInit {
  checked = false;
  loading = false;
  indeterminate = false;
  tableData: ReadonlyArray<any> = [];
  currentPageData: ReadonlyArray<any> = [];
  setOfCheckedId = new Set<number>();
  resourcePlans = Object.values(ResourcePlan).filter((value) => typeof value === 'string');
  private membershipTypes: MembershipType[];
  private resourceTypes: ResourceType[];

  constructor(
    private resourceService: ResourceService,
    private shoppingService: ShoppingService,
    private authService: AuthService,
    public dialog: MatDialog,
    public notificationService: NzNotificationService,
  ) {}

  // TODO: Item renew
  // Display item including mem + all resources can be renewed X
  // Click renew to show popup with price and basic info and ask to pay
  // pay to place an renew order
  // show order completed on popup
  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onCurrentPageDataChange(listOfCurrentPageData: ReadonlyArray<any>): void {
    this.currentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    const listOfEnabledData = this.currentPageData.filter(({ disabled }) => !disabled);
    this.checked = listOfEnabledData.every(({ id }) => this.setOfCheckedId.has(id));
    this.indeterminate = listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.tableData.filter(({ disabled }) => !disabled).forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

  renewItems(): void {
    this.loading = true;
    const itemsToRenew = this.tableData.filter((data) => this.setOfCheckedId.has(data.id));
    console.log(itemsToRenew);

    const order = this.shoppingService.generateRenewOrder(
      itemsToRenew.map((item) => item.price).reduce((sum, val) => sum + val),
      itemsToRenew,
    );

    const dialogRef = this.dialog.open(MakePaymentFormComponent, {
      width: '50%',
      minWidth: 200,
      data: { type: 'RENEW', order },
    });
    dialogRef.afterClosed().subscribe((data) => {
      this.setOfCheckedId.clear();
      this.refreshCheckedStatus();
      this.loading = false;
    });
  }

  ngOnInit(): void {
    this.loadRenewableItems();
  }

  loadRenewableItems(): void {
    combineLatest([
      this.resourceService.loadMembershipTypes(),
      this.resourceService.loadResourceTypes(),
      this.resourceService.getRenewableItems(this.authService.getUserName()),
    ]).subscribe(
      ([memberTypes, resourceTypes, tableData]) => {
        this.membershipTypes = memberTypes;
        this.resourceTypes = resourceTypes;

        this.tableData = tableData;
        this.tableData.forEach((item) => {
          item.pricingPlan = ResourcePlan[ResourcePlan.MONTHLY];
          item.priceList =
            item.type === 'membership'
              ? _.find(memberTypes, (memberType) => memberType.name === item.name)
              : _.find(resourceTypes, (resourceType) => resourceType.tableName === item.type);
          item.price = item.priceList.monthlyPrice;
        });

        this.loading = false;
      },
      (err) => console.error(err),
    );
  }

  onPlanChange(event: any, row: any): void {
    switch (ResourcePlan[row.pricingPlan]) {
      // @ts-ignore
      case ResourcePlan.MONTHLY:
        row.price = row.priceList.monthlyPrice;
        break;
      // @ts-ignore
      case ResourcePlan.QUARTERLY:
        row.price = row.priceList.quarterlyPrice;
        break;
      // @ts-ignore
      case ResourcePlan.YEARLY:
        row.price = row.priceList.yearlyPrice;
        break;
    }
  }
}
