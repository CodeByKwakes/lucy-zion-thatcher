import { computed, inject } from '@angular/core';
import { DataService } from '@lzt/shared/domain';
import { Testimonial } from '@lzt/shared/models';
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
import { mergeMap, pipe, tap } from 'rxjs';
import { withTestimonialFeatures } from './testimonial.features';
import { Store } from '@ngrx/store';
import { selectUrl } from '@lzt/core/api';

const testimonialConfig = {
  entity: type<Testimonial>(),
  collection: 'testimonial',
  selectId: (testimonial: Testimonial) => testimonial.id
};

export const TestimonialStore = signalStore(
  withEntities(testimonialConfig),
  withTestimonialFeatures(),
  withComputed(({ testimonialEntities }, store = inject(Store)) => ({
    pageTestimonials: computed(() => {
      const url = store.selectSignal(selectUrl);

      return testimonialEntities().filter(
        (testimonial) => testimonial.page === url().slice(1)
      );
    })
  })),
  withMethods((store, dataService = inject(DataService)) => ({
    loadTestimonials: rxMethod<void>(
      pipe(
        tap(() => patchState(store, setPending())),
        mergeMap(() => {
          return dataService.loadTestimonials().pipe(
            tapResponse({
              next: (testimonials) =>
                patchState(store, addEntities(testimonials, testimonialConfig)),
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
