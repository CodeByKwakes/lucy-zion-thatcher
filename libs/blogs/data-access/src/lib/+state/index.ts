import { inject, makeEnvironmentProviders } from '@angular/core';
import { Store, provideState } from '@ngrx/store';
import {
  blogFeature,
  selectAll,
  selectEntities,
  selectIsLoaded
} from './blog.reducer';
import { BlogActions } from './blog.actions';
import { tap, filter, take } from 'rxjs';
import { provideEffects } from '@ngrx/effects';
import { blogEffects } from './blog.effects';
import { DIRECTUS_IMAGE_PATH } from '@lzt/shared/data-access';

const checkBlogStore = () => {
  const store = inject(Store);

  return store.select(selectIsLoaded).pipe(
    tap((loaded) => {
      if (!loaded) {
        store.dispatch(BlogActions.loadBlogs());
      }
    }),
    filter((loaded) => loaded),
    take(1)
  );
};

export const provideBlogFeature = () => {
  return makeEnvironmentProviders([
    provideState(blogFeature),
    provideEffects(blogEffects)
  ]);
};

export const useBlogFeature = () => {
  const store = inject(Store);

  return {
    init: () => store.dispatch(BlogActions.loadBlogs()),
    imagePathUrl: DIRECTUS_IMAGE_PATH,
    $allBlogs: store.selectSignal(selectAll),
    entities$: store.select(selectEntities),
    checkBlogStore: checkBlogStore()
  };
};
