import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { _HttpClient } from '@delon/theme';
import { Observable, of } from 'rxjs';
import { ResourceService } from '../../core/resource/resource.service';

@Component({
  selector: 'app-booth-card',
  templateUrl: './booth-card.component.html',
  styles: [],
})
export class BoothCardComponent implements OnInit {
  booths: any[] = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private _httpClient: _HttpClient,
    private resourceService: ResourceService,
  ) {
    activatedRoute.params.subscribe((data) => {
      const category = this.activatedRoute.snapshot.paramMap.get('category');
      this.resourceService.categoryChangeSubject.next(category);
      this.loadBooths().subscribe((res) => {
        this.booths = res.booths[category];
      });
    });
  }

  ngOnInit(): void {}

  loadBooths(): Observable<any> {
    return of({
      booths: {
        restaurant: [
          {
            name: '老鸭堂',
            phone: '223-222-2032',
            email: 'duckduck@gmail.com',
            address: '112 Castle Rd, Austin',
            description: '百年老鸭，品质保证',
          },
          {
            name: '八仙居',
            phone: '227-222-2022',
            email: 'baxian@gmail.com',
            address: '120 Rainbow Rd, Austin',
            description: '八仙过海，保你吃high',
          },
          {
            name: '海底捞',
            phone: '327-111-2042',
            email: 'haidi@gmail.com',
            address: '119 Sea Rd, Austin',
            description: '火锅界的白月光',
          },
        ],
        gardening: [
          {
            name: '美丽家园',
            phone: '122-222-2032',
            email: 'meili@gmail.com',
            description: '梦幻家园，您值得拥有',
          },
        ],
        accounting: [
          {
            name: '蒋会计',
            phone: '420-222-2032',
            email: 'jiang@gmail.com',
            description: 'austin 金牌会计，一个顶三',
          },
        ],
      },
    });
  }
}
