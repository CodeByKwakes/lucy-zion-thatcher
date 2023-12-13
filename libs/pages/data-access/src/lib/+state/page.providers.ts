import { inject, makeEnvironmentProviders } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { Store, provideState } from '@ngrx/store';
import { filter, take, tap } from 'rxjs';
import { PageActions } from './page.actions';
import { pageEffects } from './page.effects';
import {
  pageFeature,
  selectCurrentPage,
  selectIsLoaded,
  selectPageBySlug
} from './page.reducer';

function useCheckPageStore() {
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
    checkPageStore: useCheckPageStore(),
    $currentPage: store.selectSignal(selectCurrentPage),
    $getPageBySlug: (slug: string) => store.selectSignal(selectPageBySlug(slug))
  };
}
