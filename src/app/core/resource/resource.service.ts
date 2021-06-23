import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { API_PREFIX_PATH } from '../constants/ApiClientConstants';
import { PAGE_SIZE } from '../constants/NavigationConstants';
import { MyResourceType } from '../constants/MyResourceType';
import { Ads } from '../models/Ads';
import { Booth } from '../models/Booth';
import { CategoryType } from '../models/CategoryType';
import { PageList } from '../models/Common';
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

  constructor(public boothHttpClient: _HttpClient, public jobHttpClient: _HttpClient, private httpClient: _HttpClient) {}

  loadCategories(categoryType: CategoryType): Observable<any> {
    return this.httpClient.get(this.categoryBaseUrl, { type: CategoryType[categoryType] });
  }

  loadAllAds(): Observable<Ads[]> {
    return this.httpClient.get(this.adsBaseUrl);
  }

  loadJobsByCategory(categoryName: string, categoryType: any, query: string, page: number): Observable<PageList<Job>> {
    return this.jobHttpClient.get(this.jobsBaseUrl, { name: categoryName, type: categoryType, query, page, pageSize: PAGE_SIZE });
  }

  loadBoothsByCategory(categoryName: string, categoryType: any, query: string, page: number): Observable<PageList<Booth>> {
    return this.boothHttpClient.get(this.boothsBaseUrl, { name: categoryName, type: categoryType, query, page, pageSize: PAGE_SIZE });
  }

  loadMyResource(resourceType: MyResourceType, isArchived: boolean): Observable<any[]> {
    return this.httpClient.get(API_PREFIX_PATH + '/' + resourceType.toLowerCase() + '/owned', {
      accountName: localStorage.getItem('account'),
      isArchived,
    });
  }

  loadMembershipTypes(): Observable<MembershipType[]> {
    return this.httpClient.get(this.membershipBaseUrl + '/types');
  }

  loadResourceTypes(): Observable<ResourceType[]> {
    return this.httpClient.get(this.resourceBaseUrl + '/types');
  }

  updateMembershipAutoSubscribed(membershipId: any, autoSubscribed: boolean): Observable<any> {
    const accountName = localStorage.getItem('account');
    if (!accountName) {
      throw new Error('Account name cant be found!');
    }
    return this.httpClient.post(this.membershipBaseUrl + '/' + membershipId + '/subscriptions', {
      autoSubscribed,
    });
  }

  updateResource(myResourceType: MyResourceType, updates: any): Observable<any> {
    return this.httpClient.put(API_PREFIX_PATH + '/' + myResourceType.toLowerCase(), updates);
  }

  updateResourceStatus(resourceId: any, isArchived: boolean): Observable<any> {
    return this.httpClient.put(this.resourceBaseUrl, {
      resourceId,
      isArchived,
    });
  }
}
