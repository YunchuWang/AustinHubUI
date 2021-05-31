import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { _HttpClient } from '@delon/theme';
import { Observable, of } from 'rxjs';
import { ResourceService } from '../../core/resource/resource.service';
import { CategoryType } from '@core';
import { Booth } from '../../core/models/Booth';

@Component({
  selector: 'app-booth-card',
  templateUrl: './booth-card.component.html',
  styles: [],
})
export class BoothCardComponent implements OnInit {
  booths: Booth[] = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private _httpClient: _HttpClient,
    private resourceService: ResourceService,
  ) {
    activatedRoute.params.subscribe((data) => {
      const categoryName = this.activatedRoute.snapshot.paramMap.get('category');
      this.resourceService.loadBoothsByCategory(categoryName, CategoryType[CategoryType.RESC]).subscribe((booths) => {
        this.booths = booths;
      });
    });
  }

  ngOnInit(): void {}
}
