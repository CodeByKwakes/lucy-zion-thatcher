import { Injectable, inject } from '@angular/core';
import {
  AboutPage,
  BlogPost,
  ContactPage,
  GlobalPage,
  HomePage,
  MessageMeta,
  PageType,
  SpeakerPage,
  Testimonial
} from '@lzt/shared/models';
import { Observable, forkJoin, map, tap } from 'rxjs';
import {
  createMessage,
  getBlogPosts,
  getPage,
  getTestimonials
} from '../utils';
import { CacheService } from '@lzt/shared/utils';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  readonly #cacheService = inject(CacheService);
  /**
   * Loads all the blog posts.
   * @returns {Observable<BlogPost[]>} An observable that emits an array of blog posts.
   */
  loadAllBlogs(): Observable<BlogPost[]> {
    // const cachedData = this.#cacheService.get('blogs');

    // if (cachedData) {
    //   console.log('cachedData blogs');
    //   return new Observable<BlogPost[]>((observer) => {
    //     observer.next(cachedData as BlogPost[]);
    //     observer.complete();
    //   });
    // } else {
    // console.log('http blogs');

    /**
     * Array of observables.
     * @type {Observable<BlogPost[]>[]}
     */
    const observables = [getBlogPosts() as unknown as Observable<BlogPost[]>];

    return forkJoin(observables).pipe(
      map(([blogs]) => blogs)
      // tap((blogs) => this.#cacheService.set('blogs', blogs))
    );
    // }
  }

  /**
   * Loads all pages by returning an observable that emits an array of pages.
   * Each page is represented by a specific page type.
   * @returns An observable that emits an array of pages.
   */
  loadPages(): Observable<PageType[]> {
    const cachedData = this.#cacheService.get('pages');

    if (cachedData) {
      console.log('cachedData pages');

      return new Observable<PageType[]>((observer) => {
        observer.next(cachedData as PageType[]);
        observer.complete();
      });
    }
    console.log('http pages');
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

    return forkJoin(observables).pipe(
      tap((pages) => this.#cacheService.set('pages', pages))
    );
  }

  loadTestimonials(): Observable<Testimonial[]> {
    const observables = [
      getTestimonials() as unknown as Observable<Testimonial[]>
    ];

    return forkJoin(observables).pipe(map(([testimonials]) => testimonials));
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
