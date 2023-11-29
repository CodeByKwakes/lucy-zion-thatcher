import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { blogEffects } from './blog.effects';

describe('BlogEffects', () => {
  let actions$: Observable<never>;
  // let effects: typeof blogEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [blogEffects, provideMockActions(() => actions$)]
    });

    // effects = TestBed.inject(blogEffects);
  });

  // it('should be created', () => {
  //   expect(effects).toBeTruthy();
  // });
});
