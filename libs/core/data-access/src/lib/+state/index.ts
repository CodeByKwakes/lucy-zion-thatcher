import { makeEnvironmentProviders } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { CustomSerializer } from '../utils/custom-serializer';
import * as routerEffects from './router.effects';

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
