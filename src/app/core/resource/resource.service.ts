import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable, Subject } from 'rxjs';
import { Ads } from '../models/Ads';
import { CategoryType } from '../models/CategoryType';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  categoryBaseUrl = '/api/categories';
  adsBaseUrl = '/api/ads';

  categoryChangeSubject: Subject<string> = new Subject<string>();

  constructor(private httpClient: _HttpClient) {}

  loadCategories(categoryType: CategoryType): Observable<any> {
    return this.httpClient.get(this.categoryBaseUrl, { categoryType: CategoryType[categoryType] });
  }

  loadAllAds(): Observable<Ads[]> {
    return this.httpClient.get(this.adsBaseUrl);
  }
}
