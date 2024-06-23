import { computed, inject } from '@angular/core';
import { selectRouteByParam } from '@lzt/core/api';
import { DataService } from '@lzt/shared/data-access';
import { BlogPost } from '@lzt/shared/models';
import { setError, setFulfilled, setPending } from '@lzt/shared/utils';
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
import { withBlogFeatures } from './blog.features';

const entity = type<BlogPost>();
const collection = 'blog';

export const BlogStore = signalStore(
  { providedIn: 'root' },
  withEntities({ entity, collection }),
  withBlogFeatures(),
  withComputed(({ blogEntityMap }, store = inject(Store)) => ({
    selectBlogFromRoute: computed(() => {
      const params = store.selectSignal(selectRouteByParam);

      return blogEntityMap()[params()['slug']] ?? null;
    })
  })),
  withMethods((store, dataService = inject(DataService)) => ({
    loadBlogs: rxMethod<void>(
      pipe(
        mergeMap(() => {
          patchState(store, setPending());

          return dataService.loadAllBlogs().pipe(
            tapResponse({
              next: (blogs) =>
                patchState(
                  store,
                  addEntities(blogs, { collection, idKey: 'slug' })
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
    onInit({ loadBlogs }) {
      loadBlogs();
    },
    onDestroy() {
      console.log('BlogStore.onDestroy()');
    }
  })
);
