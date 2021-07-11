import { _HttpClient } from '@delon/theme';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_PREFIX_PATH } from '../../constants/ApiClientConstants';

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
  EMAILS_BASE_URL = API_PREFIX_PATH + '/emails';

  constructor(private http: _HttpClient) {}

  sendContactEmail(contactFormData: any): Observable<string> {
    return this.http.post(this.EMAILS_BASE_URL + '/contact', contactFormData);
  }
}
