import { inject } from '@angular/core';
import { DataService } from '@lzt/shared/domain';
import { Testimonial } from '@lzt/shared/models';
import { setError, setFulfilled, setPending } from '@lzt/shared/utils';
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
import { withTestimonialFeatures } from './testimonial.features';

const entity = type<Testimonial>();
const collection = 'testimonial';
const idKey = 'id';

export const TestimonialStore = signalStore(
  { providedIn: 'root' },
  withEntities({ entity, collection }),
  withTestimonialFeatures(),
  // withComputed(({ testimonialEntityMap }, store = inject(Store)) => ({
  //   selectBlogFromRoute: computed(() => {
  //     const params = store.selectSignal(selectRouteByParam);

  //     return testimonialEntityMap()[params()['slug']] ?? null;
  //   })
  // })),
  withMethods((store, dataService = inject(DataService)) => ({
    loadTestimonials: rxMethod<void>(
      pipe(
        tap(() => patchState(store, setPending())),
        mergeMap(() => {
          return dataService.loadTestimonials().pipe(
            tapResponse({
              next: (testimonials) =>
                patchState(
                  store,
                  addEntities(testimonials, { collection, idKey })
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
    onInit({ loadTestimonials }) {
      loadTestimonials();
    },
    onDestroy() {
      console.log('TestimonialStore.onDestroy()');
    }
  })
);
