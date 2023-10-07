import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { PageDataModel } from '@lzt/pages/models';

export const PageActions = createActionGroup({
  source: 'Page',
  events: {
    'Load Pages': emptyProps(),
    'Load Pages Success': props<{ data: PageDataModel }>(),
    'Load Pages Failure': props<{ error: Error }>()
  }
});
