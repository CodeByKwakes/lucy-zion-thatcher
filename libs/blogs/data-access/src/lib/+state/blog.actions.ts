import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { BlogPost } from '@lzt/shared/models';

export const BlogActions = createActionGroup({
  source: 'Blog',
  events: {
    'Load Blogs': emptyProps(),
    'Load Blogs Success': props<{ blogs: BlogPost[] }>(),
    'Load Blogs Failure': props<{ error: Error }>()
  }
});
