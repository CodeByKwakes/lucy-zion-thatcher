import { inject, makeEnvironmentProviders } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { Store, provideState } from '@ngrx/store';
import {
  pageFeature,
  selectCurrentPage,
  selectIsLoaded,
  selectPageBySlug
} from './page.reducer';
import { pageEffects } from './page.effects';
import { PageActions } from './page.actions';
import { tap, filter, take } from 'rxjs';
import { DIRECTUS_IMAGE_PATH } from '../utils/directus.util';

function checkPageStore() {
  const store = inject(Store);

  return store.select(selectIsLoaded).pipe(
    tap((loaded) => {
      if (!loaded) {
        store.dispatch(PageActions.loadPages());
      }
    }),
    filter((loaded) => loaded),
    take(1)
  );
}

export function providePageFeature() {
  return makeEnvironmentProviders([
    provideState(pageFeature),
    provideEffects(pageEffects)
  ]);
}

export function usePageFeature() {
  const store = inject(Store);

  return {
    init: () => store.dispatch(PageActions.loadPages()),
    $currentPage: store.selectSignal(selectCurrentPage),
    checkPageStore: checkPageStore(),
    $getPageBySlug: (slug: string) =>
      store.selectSignal(selectPageBySlug(slug)),
    imagePathUrl: DIRECTUS_IMAGE_PATH
  };
}
