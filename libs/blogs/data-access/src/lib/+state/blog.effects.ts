import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { BlogActions } from './blog.actions';

import { DataService } from '@lzt/shared/data-access';

const loadBlogs$ = createEffect(
  (actions$ = inject(Actions), dataService = inject(DataService)) => {
    return actions$.pipe(
      ofType(BlogActions.loadBlogs),
      mergeMap(() => {
        return dataService.loadAllBlogs().pipe(
          map((blogs) => BlogActions.loadBlogsSuccess({ blogs })),
          catchError((error) => of(BlogActions.loadBlogsFailure({ error })))
        );
      })
    );
  },
  { functional: true }
);

export const blogEffects = { loadBlogs$ };
