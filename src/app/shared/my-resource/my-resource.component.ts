import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ResourceService } from '@core';
import { AdsFormComponent } from '../ads-form/ads-form.component';
import { BoothFormComponent } from '../booth-form/booth-form.component';
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
  @Output() resourceStatusChanged: EventEmitter<any> = new EventEmitter();
  isActive = true;
  displayedColumns: string[] = ['name', 'category', 'expirationDate', 'action'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, public resourceService: ResourceService) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.activeResources);
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator?.firstPage();
  }

  selectResource(event: any): void {
    this.dataSource = new MatTableDataSource(event.index === 0 ? this.activeResources : this.inactiveResources);
    this.isActive = event.index === 0;
  }

  edit(row: any): void {
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
        break;
      default:
        return;
    }
    console.log(row);
    const dialogRef = this.dialog.open(formComponent, {
      width: '70%',
      data: {
        resource: row,
        persist: true,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      console.log(res);
    });
  }

  archive(row: any): void {
    console.log(row);
    this.resourceService.updateResourceStatus(row.resourceId, true).subscribe((res) => {
      console.log('updated archive');
      this.resourceStatusChanged.emit();
    });
  }

  unarchive(row: any): void {
    console.log(row);
    this.resourceService.updateResourceStatus(row.resourceId, false).subscribe((res) => {
      console.log('updated archive');
      this.resourceStatusChanged.emit();
    });
  }
}
