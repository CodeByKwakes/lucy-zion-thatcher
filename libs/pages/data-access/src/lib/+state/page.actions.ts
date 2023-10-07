import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const PageActions = createActionGroup({
  source: 'Page',
  events: {
    'Load Pages': emptyProps(),
    'Load Pages Success': props<{ data: unknown[] }>(),
    'Load Pages Failure': props<{ error: Error }>()
  }
});
