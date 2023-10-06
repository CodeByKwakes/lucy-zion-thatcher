import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { getPage } from '../utils/directus.util';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loadAllPages(): Observable<Record<string, any>[]> {
    return forkJoin([getPage('home'), getPage('about'), getPage('speaker')]);
  }
}
