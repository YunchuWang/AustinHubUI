import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrderService } from '@core';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styles: [],
})
export class OrderHistoryComponent implements OnInit {
  orders: any;
  displayedColumns: string[] = ['orderNumber', 'price', 'createdTime', 'status'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private orderService: OrderService) {}
  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.loadOrders(localStorage.getItem('account')).subscribe((orders) => {
      console.log(this.orders);
      this.orders = orders;
      this.dataSource = new MatTableDataSource(this.orders);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
