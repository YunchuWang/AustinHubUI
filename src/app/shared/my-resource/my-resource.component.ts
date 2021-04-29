import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MyResource } from '../../core/models/MyResource';
import { MatDialog } from '@angular/material/dialog';
import { AccountMyBoothsComponent } from '../../routes/account/my-booths/my-booths.component';
import { BoothFormComponent } from '../booth-form/booth-form.component';
import { AdsFormComponent } from '../ads-form/ads-form.component';
import { JobFormComponent } from '../job-form/job-form.component';

@Component({
  selector: 'app-my-resource',
  templateUrl: './my-resource.component.html',
  styles: [],
})
export class MyResourceComponent implements OnInit {
  @Input() resourceType: string;

  @Input() activeResources: any[];
  @Input() inactiveResources: any[];

  isActive: boolean = true;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.activeResources);
  }

  displayedColumns: string[] = ['name', 'category', 'expirationDate', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  selectResource(event: any) {
    this.dataSource = new MatTableDataSource(event.index === 0 ? this.activeResources : this.inactiveResources);
    this.isActive = event.index === 0;
  }

  edit(row: any) {
    let formComponent;
    switch (this.resourceType) {
      case 'booths':
        formComponent = BoothFormComponent;
        break;
      case 'ads':
        formComponent = AdsFormComponent;
        break;
      case 'jobs':
        formComponent = JobFormComponent;
      default:
        return;
    }
    const dialogRef = this.dialog.open(formComponent, {
      width: '30%',
      data: row,
    });

    dialogRef.afterClosed().subscribe((res) => {
      console.log(res);
    });
  }

  archive(row) {}

  activate(row) {}
}
