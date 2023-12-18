import { effect, inject } from '@angular/core';
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
  withHooks,
  withMethods
} from '@ngrx/signals';
import { addEntities, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { mergeMap, pipe, tap } from 'rxjs';

export const BlogStore = signalStore(
  { providedIn: 'root' },
  withEntities({ entity: type<BlogPost>(), collection: 'blog' }),
  withCallState(),
  // withComputed(({ blogEntityMap }, coreStore = inject(selectRouteByParam)) => ({
  //   selectBlogFromRoute: computed(() => {
  //     // const id = coreStore.select(
  //     //   selectRouteByParam({ param: 'id' })
  //     // ) as string;
  //     const id = coreStore({ param: 'id' });

  //     return blogEntityMap()[id] ?? null;
  //   })
  // })),
  withMethods((store, dataService = inject(DataService)) => ({
    loadBlogs: rxMethod<void>(
      pipe(
        tap(() => patchState(store, setLoading())),
        mergeMap(() => {
          // patchState(store, setLoading());
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
    onInit({ loadBlogs, blogEntities, blogIds, callState }) {
      loadBlogs();
      effect(() => {
        console.log('BlogStore callState', callState());
        console.log('BlogStore.onInit()');
        console.log('blogIds', blogIds());
        console.log('blogEntities', blogEntities());
      });
    },
    onDestroy() {
      console.log('BlogStore.onDestroy()');
    }
  })
);
