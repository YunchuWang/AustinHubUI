import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryType, ResourceService } from '@core';
import { _HttpClient } from '@delon/theme';
import { Job } from '../../core/models/Job';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styles: [],
})
export class JobCardComponent implements OnInit {
  jobs: Job[];
  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private _httpClient: _HttpClient,
    private resourceService: ResourceService,
  ) {
    activatedRoute.params.subscribe((data) => {
      const categoryName = this.activatedRoute.snapshot.paramMap.get('category');
      this.resourceService.loadJobsByCategory(categoryName, CategoryType[CategoryType.RESC]).subscribe((jobs) => {
        this.jobs = jobs;
      });
    });
  }

  ngOnInit(): void {}
}
