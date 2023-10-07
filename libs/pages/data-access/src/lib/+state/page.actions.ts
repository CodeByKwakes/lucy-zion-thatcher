import { AboutPage, HomePage, SpeakerPage } from '@lzt/pages/models';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const PageActions = createActionGroup({
  source: 'Page',
  events: {
    'Load Pages': emptyProps(),
    'Load Pages Success': props<{
      home: Record<string, HomePage>[];
      about: Record<string, AboutPage>[];
      speaker: Record<string, SpeakerPage>[];
    }>(),
    'Load Pages Failure': props<{ error: Error }>()
  }
});
