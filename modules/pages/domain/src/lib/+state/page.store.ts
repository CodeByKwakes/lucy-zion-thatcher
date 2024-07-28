import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { computed, inject } from '@angular/core';
import { selectUrl } from '@lzt/core/api';
import { DataService } from '@lzt/shared/domain';
import { PageTypeOptions } from '@lzt/shared/models';
import {
  setError,
  setFulfilled,
  setPending,
  withStateLogging,
  withRequestStatus
} from '@lzt/shared/utils';
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
import { mergeMap, pipe, tap } from 'rxjs';

export const PageStore = signalStore(
  { providedIn: 'root' },
  withDevtools('pages'),
  withEntities({ entity: type<PageTypeOptions>(), collection: 'page' }),
  withRequestStatus(),
  withStateLogging('pages'),
  withComputed(({ pageEntityMap }, store = inject(Store)) => ({
    selectCurrentPage: computed(() => {
      const url = store.selectSignal(selectUrl);
      return pageEntityMap()[url().slice(1)] ?? null;
    }),
    selectGlobalPage: computed(() => {
      return pageEntityMap()['global'] ?? null;
    })
  })),
  withMethods((store, dataService = inject(DataService)) => ({
    loadPages: rxMethod<void>(
      pipe(
        tap(() => patchState(store, setPending())),
        mergeMap(() => {
          return dataService.loadPages().pipe(
            tapResponse({
              next: (pages) =>
                patchState(
                  store,
                  addEntities(pages, { collection: 'page', idKey: 'slug' })
                ),
              error: (error: Error) =>
                patchState(store, setError(error.message)),
              finalize: () => patchState(store, setFulfilled())
            })
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
