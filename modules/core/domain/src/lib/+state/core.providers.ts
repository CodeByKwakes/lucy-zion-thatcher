import { makeEnvironmentProviders, inject } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { routerReducer, provideRouterStore } from '@ngrx/router-store';
import { provideStore, Store } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { CustomSerializer } from '../utils/custom-serializer';
import { RouterActions } from './router.actions';
import { RouterEffects } from './router.effects';

/**
 * Provides the core store configuration for the application.
 * @returns The environment providers for the core store.
 */
export function provideCoreStore() {
  return makeEnvironmentProviders([
    provideStore({
      router: routerReducer
    }),
    provideRouterStore({
      serializer: CustomSerializer
    }),
    provideEffects(RouterEffects),
    provideStoreDevtools()
  ]);
}

/**
 * The `useCoreStore` function returns an object with methods to navigate the router.
 * @returns The function `useCoreStore` returns an object with three properties: `routeTo`,
 * `routeForward`, and `routeBack`.
 */
export function useCoreStore() {
  const store = inject(Store);
  return {
    routeTo: (path: unknown[], query?: object, extras?: object) =>
      store.dispatch(RouterActions.go({ path, query, extras })),
    routeForward: () => store.dispatch(RouterActions.forward()),
    routeBack: () => store.dispatch(RouterActions.back())
  };
}
