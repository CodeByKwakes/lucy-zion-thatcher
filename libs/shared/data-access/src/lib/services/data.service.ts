import { Injectable } from '@angular/core';
import {
  AboutPage,
  BlogPost,
  ContactPage,
  GlobalPage,
  HomePage,
  MessageMeta,
  PageArray,
  SpeakerPage
} from '@lzt/shared/models';
import { Observable, forkJoin, map } from 'rxjs';
import { createMessage, getBlogPosts, getPage } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  /**
   * Loads all the blog posts.
   * @returns {Observable<BlogPost[]>} An observable that emits an array of blog posts.
   */
  loadAllBlogs(): Observable<BlogPost[]> {
    /**
     * Array of observables.
     * @type {Observable<BlogPost[]>[]}
     */
    const observables = [getBlogPosts() as unknown as Observable<BlogPost[]>];

    return forkJoin(observables).pipe(map(([blogs]) => blogs));
  }

  /**
   * Loads all pages by returning an observable that emits an array of pages.
   * Each page is represented by a specific page type.
   * @returns An observable that emits an array of pages.
   */
  loadAllPages(): Observable<PageArray> {
    /**
     * Array of observables representing different pages.
     * Each observable corresponds to a specific page type.
     */
    const observables = [
      getPage('global') as unknown as Observable<GlobalPage>,
      getPage('home') as unknown as Observable<HomePage>,
      getPage('about') as unknown as Observable<AboutPage>,
      getPage('speaker') as unknown as Observable<SpeakerPage>,
      getPage('contact') as unknown as Observable<ContactPage>
    ];

    return forkJoin(observables);
  }

  /**
   * Sends a message using the provided data.
   * @param data The message metadata.
   * @returns A promise that resolves to the response from the server.
   */
  sendMessage(data: MessageMeta): Promise<Record<string, unknown>> {
    return createMessage(data);
  }
}
