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

export interface BlogPost {
  id: string;
  status: string;
  sort: null;
  user_created: string;
  date_created: Date;
  user_updated: string;
  date_updated: Date;
  header_title: string;
  header_image: string;
  blog_title: string;
  blog_feature_image: string;
  blog_content: string;
}

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

  loadAllBlogs(): Observable<BlogPost[]> {
    return forkJoin([getBlogPosts() as unknown as Observable<BlogPost[]>]).pipe(
      map(([blogs]) => blogs)
    );
  }
}
