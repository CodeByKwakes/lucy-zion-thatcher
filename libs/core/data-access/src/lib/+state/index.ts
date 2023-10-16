import { inject, makeEnvironmentProviders } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { Store, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { CustomSerializer } from '../utils/custom-serializer';
import { RouterActions } from './router.actions';
import * as routerEffects from './router.effects';

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
