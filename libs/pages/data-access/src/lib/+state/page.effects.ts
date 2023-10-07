import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { DataService } from '../services/data.service';
import { PageActions } from './page.actions';

const loadPages$ = createEffect(
  (actions$ = inject(Actions), dataService = inject(DataService)) => {
    return actions$.pipe(
      ofType(PageActions.loadPages),
      mergeMap(() => {
        return dataService.loadAllPages().pipe(
          map((data) => PageActions.loadPagesSuccess({ data })),
          catchError((error) => of(PageActions.loadPagesFailure({ error })))
        );
      })
    );
  },
  { functional: true }
);

export const pageEffects = { loadPages$ };
