import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { getPage } from '../utils/directus.util';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // constructor() { }

  loadAllPages() {
    return forkJoin([getPage('home'), getPage('about'), getPage('speaker')]);
  }
}
