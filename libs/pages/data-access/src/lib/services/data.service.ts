import { Injectable } from '@angular/core';
import { PageDataModel } from '@lzt/pages/models';
import { Observable, forkJoin } from 'rxjs';
import { getPage } from '../utils/directus.util';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  loadAllPages(): Observable<PageDataModel> {
    return forkJoin([getPage('home'), getPage('about'), getPage('speaker')]);
  }
}
