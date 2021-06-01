import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable, Subject } from 'rxjs';
import { API_PREFIX_PATH } from '../constants/ApiClientConstants';
import { Ads } from '../models/Ads';
import { Booth } from '../models/Booth';
import { CategoryType } from '../models/CategoryType';
import { Job } from '../models/Job';
import { MembershipType } from '../models/MembershipType';
import { ResourceType } from '../models/ResourceType';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  resourceBaseUrl = API_PREFIX_PATH + '/resource';
  categoryBaseUrl = API_PREFIX_PATH + '/categories';
  adsBaseUrl = API_PREFIX_PATH + '/ads';
  boothsBaseUrl = API_PREFIX_PATH + '/booths';
  jobsBaseUrl = API_PREFIX_PATH + '/jobs';
  membershipBaseUrl = API_PREFIX_PATH + '/memberships';

  categoryChangeSubject: Subject<string> = new Subject<string>();

  constructor(private httpClient: _HttpClient) {}

  loadCategories(categoryType: CategoryType): Observable<any> {
    return this.httpClient.get(this.categoryBaseUrl, { type: CategoryType[categoryType] });
  }

  loadAllAds(): Observable<Ads[]> {
    return this.httpClient.get(this.adsBaseUrl);
  }

  loadJobsByCategory(categoryName: string, categoryType: any): Observable<Job[]> {
    return this.httpClient.get(this.jobsBaseUrl, { name: categoryName, type: categoryType });
  }

  loadBoothsByCategory(categoryName: string, categoryType: any): Observable<Booth[]> {
    return this.httpClient.get(this.boothsBaseUrl, { name: categoryName, type: categoryType });
  }

  loadMembershipTypes(): Observable<MembershipType[]> {
    return this.httpClient.get(this.membershipBaseUrl + '/types');
  }

  loadResourceTypes(): Observable<ResourceType[]> {
    return this.httpClient.get(this.resourceBaseUrl + '/types');
  }
}
