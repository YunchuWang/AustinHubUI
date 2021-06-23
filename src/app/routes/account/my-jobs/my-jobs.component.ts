import { Component, OnInit } from '@angular/core';
import { MyResourceType, ResourceService } from '@core';
import { _HttpClient } from '@delon/theme';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-account-my-jobs',
  templateUrl: './my-jobs.component.html',
})
export class AccountMyJobsComponent implements OnInit {
  activeJobs: any[];

  inactiveJobs: any[];
  loading = true;

  constructor(private http: _HttpClient, private resourceService: ResourceService) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.loading = true;
    combineLatest([
      this.resourceService.loadMyResource(MyResourceType.JOBS, true),
      this.resourceService.loadMyResource(MyResourceType.JOBS, false),
    ]).subscribe(
      ([inactive, active]) => {
        this.inactiveJobs = inactive.map((row) => {
          return {
            ...row,
            category: row.categoryName,
            expirationDate: row.expirationTime,
          };
        });
        this.activeJobs = active.map((row) => {
          return {
            ...row,
            category: row.categoryName,
            expirationDate: row.expirationTime,
          };
        });

        this.loading = false;
      },
      (err) => console.error(err),
    );
  }

  onResourceStatusChanged(event: any): void {
    this.loadJobs();
  }
}
