import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Booth, CategoryType, ResourceService } from '@core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-booth-card',
  templateUrl: './booth-card.component.html',
  styles: [],
})
export class BoothCardComponent implements OnInit {
  @Input() booths: Booth[] = [];
  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private _httpClient: _HttpClient,
    private resourceService: ResourceService,
  ) {
    activatedRoute.params.subscribe((data) => {
      const categoryName = this.activatedRoute.snapshot.paramMap.get('category');
      if (!categoryName) {
        return;
      }
      this.resourceService.loadBoothsByCategory(categoryName, CategoryType[CategoryType.RESC]).subscribe((booths) => {
        this.booths = booths;
      });
    });
  }

  ngOnInit(): void {}
}
