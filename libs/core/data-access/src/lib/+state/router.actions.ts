import { NavigationExtras } from '@angular/router';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const RouterActions = createActionGroup({
  source: 'Router',
  events: {
    Go: props<{
      path: unknown[];
      query?: object;
      extras?: NavigationExtras;
    }>(),
    Back: emptyProps(),
    Forward: emptyProps()
  }
});
