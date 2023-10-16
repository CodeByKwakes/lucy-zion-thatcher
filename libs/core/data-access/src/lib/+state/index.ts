import { inject, makeEnvironmentProviders } from '@angular/core';
import { Store, createFeatureSelector, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import {
  RouterReducerState,
  provideRouterStore,
  routerReducer
} from '@ngrx/router-store';
import { CustomSerializer, RouterStateUrl } from '../utils/custom-serializer';
import * as routerEffects from './router.effects';
import { RouterActions } from './router.actions';

export const selectRouter =
  createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');

export * from './router.actions';
export * from './router.selectors';

export function provideCoreStore() {
  return makeEnvironmentProviders([
    provideStore({
      router: routerReducer
    }),
    provideRouterStore({
      serializer: CustomSerializer
    }),
    provideEffects(routerEffects),
    provideStoreDevtools()
  ]);
}

export function useCoreStore() {
  const store = inject(Store);
  return {
    routeTo: (path: unknown[], query?: object, extras?: object) =>
      store.dispatch(RouterActions.go({ path, query, extras })),
    routeForward: () => store.dispatch(RouterActions.forward()),
    routeBack: () => store.dispatch(RouterActions.back())
  };
}
