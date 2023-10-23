import { inject, makeEnvironmentProviders } from '@angular/core';
import { DIRECTUS_IMAGE_PATH } from '@lzt/shared/data-access';
import { provideEffects } from '@ngrx/effects';
import { Store, provideState } from '@ngrx/store';
import { filter, take, tap } from 'rxjs';
import { BlogActions } from './blog.actions';
import { blogEffects } from './blog.effects';
import {
  blogFeature,
  selectAll,
  selectBlogFromRoute,
  selectEntities,
  selectIsLoaded
} from './blog.reducer';

const useCheckBlogStore = () => {
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
    $currentBlog: store.selectSignal(selectBlogFromRoute),
    checkBlogStore: useCheckBlogStore()
  };
};
