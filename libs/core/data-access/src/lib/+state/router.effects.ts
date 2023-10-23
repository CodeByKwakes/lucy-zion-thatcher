import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RouterActions } from './router.actions';
import { tap } from 'rxjs/operators';
import { Location } from '@angular/common';

const navigateGo$ = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(RouterActions.go),
      tap(({ path, query: queryParams, extras }) => {
        router.navigate(path, { queryParams, ...extras });
      })
    );
  },
  { functional: true, dispatch: false }
);

const navigateForward$ = createEffect(
  (actions$ = inject(Actions), location = inject(Location)) => {
    return actions$.pipe(
      ofType(RouterActions.forward),
      tap(() => {
        location.forward();
      })
    );
  },
  { functional: true, dispatch: false }
);

const navigateBack$ = createEffect(
  (actions$ = inject(Actions), location = inject(Location)) => {
    return actions$.pipe(
      ofType(RouterActions.back),
      tap(() => {
        location.back();
      })
    );
  },
  { functional: true, dispatch: false }
);

export const routerEffects = { navigateGo$, navigateForward$, navigateBack$ };
