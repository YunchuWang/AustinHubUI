import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  categoryChangeSubject: Subject<string> = new Subject<string>();
  constructor() {}

  loadCategories(): Observable<any> {
    return of(['restaurant', 'accounting', 'gardening']);
  }
}
