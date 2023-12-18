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
  withMethods((store, dataService = inject(DataService)) => ({
    loadBlogs: rxMethod<void>(
      pipe(
        tap(() => patchState(store, setLoading())),
        mergeMap(() => {
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
    onInit({ loadBlogs, blogEntities }) {
      loadBlogs();
      effect(() => {
        console.log('BlogStore.onInit()');
        console.log('blogEntities', blogEntities());
      });
    }
  })
);
