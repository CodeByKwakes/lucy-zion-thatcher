import { computed, inject } from '@angular/core';
import { selectRouteByParam } from '@lzt/blogs/api-core';
import { DataService } from '@lzt/shared/data-access';
import { BlogPost } from '@lzt/shared/models';
import {
  setError,
  setLoaded,
  setLoading,
  withCallState
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

export const BlogStore = signalStore(
  { providedIn: 'root' },
  withEntities({ entity: type<BlogPost>(), collection: 'blog' }),
  withCallState(),
  withComputed(({ blogEntityMap }, store = inject(Store)) => ({
    selectBlogFromRoute: computed(() => {
      const params = store.selectSignal(selectRouteByParam);

      return blogEntityMap()[params()['id']] ?? null;
    })
  })),
  withMethods((store, dataService = inject(DataService)) => ({
    loadBlogs: rxMethod<void>(
      pipe(
        mergeMap(() => {
          patchState(store, setLoading());

          return dataService.loadAllBlogs().pipe(
            tapResponse({
              next: (blogs) =>
                patchState(
                  store,
                  addEntities(blogs, { collection: 'blog', idKey: 'id' })
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
    onInit({ loadBlogs }) {
      loadBlogs();
    },
    onDestroy() {
      console.log('BlogStore.onDestroy()');
    }
  })
);
