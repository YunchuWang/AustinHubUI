import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryType, ResourceService } from '@core';
import { Job } from '@core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styles: [],
})
export class JobCardComponent implements OnInit {
  @Input() jobs: Job[];

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private _httpClient: _HttpClient,
    private resourceService: ResourceService,
  ) {
    activatedRoute.params.subscribe((data) => {
      const categoryName = this.activatedRoute.snapshot.paramMap.get('category');
      console.log(categoryName);
      if (!categoryName) {
        return;
      }
      this.resourceService.loadJobsByCategory(categoryName, CategoryType[CategoryType.RESC]).subscribe((jobs) => {
        this.jobs = jobs;
      });
    });
  }

  ngOnInit(): void {}
}
