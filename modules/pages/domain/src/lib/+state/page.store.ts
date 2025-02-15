import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { computed, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  type,
  withComputed,
  withHooks,
  withMethods
} from '@ngrx/signals';
import { addEntities, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Store } from '@ngrx/store';

import { selectUrl } from '@lzt/core/api';
import { DataService } from '@lzt/shared/domain';
import { PageType } from '@lzt/shared/models';
import {
  setError,
  setFulfilled,
  setPending,
  withRequestStatus,
  withStateLogging
} from '@lzt/shared/utils';

const pageConfig = {
  entity: type<PageType>(),
  collection: 'page',
  selectId: (page: PageType) => page.slug
};

export const PageStore = signalStore(
  { providedIn: 'root' },
  withDevtools('pages'),
  withEntities(pageConfig),
  withRequestStatus(),
  withStateLogging('pages'),
  withComputed(({ pageEntityMap }, store = inject(Store)) => {
    const memoizedSelectCurrentPage = computed(() => {
      const url = store.selectSignal(selectUrl);
      return pageEntityMap()[url().slice(1)] ?? null;
    });
    const memoizedSelectGlobalPage = computed(
      () => pageEntityMap()['global'] ?? null
    );
    return {
      selectCurrentPage: memoizedSelectCurrentPage,
      selectGlobalPage: memoizedSelectGlobalPage
    };
  }),
  withMethods((store, dataService = inject(DataService)) => ({
    loadPages: rxMethod<void>(
      pipe(
        tap(() => patchState(store, setPending())),
        switchMap(() => {
          return dataService.loadPages().pipe(
            tapResponse({
              next: (pages) =>
                patchState(store, addEntities(pages, pageConfig)),
              error: (error: Error) =>
                patchState(store, setError(error.message)),
              finalize: () => patchState(store, setFulfilled())
            }),
            takeUntilDestroyed()
          );
        })
      )
    )
  })),
  withHooks({
    onInit({ loadPages }) {
      loadPages();
    }
  })
);

//  Signal<EntityMap<PageType>>

// export function withPageTypeSelectors() {
//   return signalStoreFeature(
//     { state: type<NamedEntityState<PageType, 'page'>>() },

//     withComputed(({ pageEntityMap }, store = inject(Store)) => ({
//       selectCurrentPage: computed(() => {
//         const url = store.selectSignal(selectUrl);
//         return pageEntityMap()[url().slice(1)] ?? null;
//       }),
//       selectGlobalPage: computed(() => {
//         return pageEntityMap()['global'] ?? null;
//       })
//     }))
//   );
// }
