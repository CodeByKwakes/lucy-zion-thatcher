import { Injectable } from '@angular/core';
import { AboutPage, HomePage, PageArray, SpeakerPage } from '@lzt/pages/models';
import { Observable, forkJoin } from 'rxjs';
import { getPage } from '../utils/directus.util';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  loadAllPages(): Observable<PageArray> {
    return forkJoin([
      getPage('home') as unknown as Observable<HomePage>,
      getPage('about') as unknown as Observable<AboutPage>,
      getPage('speaker') as unknown as Observable<SpeakerPage>
    ]);
  }
}
