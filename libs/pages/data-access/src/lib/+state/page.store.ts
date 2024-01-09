import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { computed, inject } from '@angular/core';
import { selectUrl } from '@lzt/core/api';
import { DataService } from '@lzt/shared/data-access';
import { PageType } from '@lzt/shared/models';
import {
  setError,
  setLoaded,
  setLoading,
  withCallStatus
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
import { mergeMap, pipe } from 'rxjs';

export const PageStore = signalStore(
  { providedIn: 'root' },
  withDevtools('pages'),
  withEntities({ entity: type<PageType>(), collection: 'page' }),
  withCallStatus(),
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
        mergeMap(() => {
          patchState(store, setLoading());

          return dataService.loadAllPages().pipe(
            tapResponse({
              next: (pages) =>
                patchState(
                  store,
                  addEntities(pages, { collection: 'page', idKey: 'slug' })
                ),
              error: (error: Error) =>
                patchState(store, setError(error.message)),
              finalize: () => patchState(store, setLoaded())
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
