import { Injectable } from '@angular/core';
import {
  AboutPage,
  GlobalPage,
  HomePage,
  PageArray,
  SpeakerPage
} from '@lzt/pages/models';
import { Observable, forkJoin, map } from 'rxjs';
import { getBlogPosts, getPage } from '../utils/directus.util';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  loadAllPages(): Observable<PageArray> {
    return forkJoin([
      getPage('global') as unknown as Observable<GlobalPage>,
      getPage('home') as unknown as Observable<HomePage>,
      getPage('about') as unknown as Observable<AboutPage>,
      getPage('speaker') as unknown as Observable<SpeakerPage>
    ]);
  }

  loadAllBlogs() {
    return forkJoin([getBlogPosts() as unknown as Observable<unknown>]).pipe(
      map(([blogs]) => blogs)
    );
  }
}
