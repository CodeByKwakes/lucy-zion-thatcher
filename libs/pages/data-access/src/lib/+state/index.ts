import { inject, makeEnvironmentProviders } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { Store, provideState } from '@ngrx/store';
import { pageFeature, selectData } from './page.reducer';
import { pageEffects } from './page.effects';
import { PageActions } from './page.actions';

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
    pages$: store.select(selectData)
  };
}