import { Injectable } from '@angular/core';
import {
  AboutPage,
  BlogPost,
  ContactPage,
  GlobalPage,
  HomePage,
  PageArray,
  SpeakerPage
} from '@lzt/shared/models';
import { Observable, forkJoin, map } from 'rxjs';
import { getBlogPosts, getPage } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  loadAllPages(): Observable<PageArray> {
    return forkJoin([
      getPage('global') as unknown as Observable<GlobalPage>,
      getPage('home') as unknown as Observable<HomePage>,
      getPage('about') as unknown as Observable<AboutPage>,
      getPage('speaker') as unknown as Observable<SpeakerPage>,
      getPage('contact') as unknown as Observable<ContactPage>
    ]);
  }

  loadAllBlogs(): Observable<BlogPost[]> {
    return forkJoin([getBlogPosts() as unknown as Observable<BlogPost[]>]).pipe(
      map(([blogs]) => blogs)
    );
  }
}
