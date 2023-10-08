import { createActionGroup, emptyProps, props } from '@ngrx/store';

export interface BlogPost {
  id: string;
  status: string;
  sort: null;
  user_created: string;
  date_created: Date;
  user_updated: string;
  date_updated: Date;
  header_title: string;
  header_image: string;
  blog_title: string;
  blog_feature_image: string;
  blog_content: string;
}

export const BlogActions = createActionGroup({
  source: 'Blog',
  events: {
    'Load Blogs': emptyProps(),
    'Load Blogs Success': props<{ blogs: BlogPost[] }>(),
    'Load Blogs Failure': props<{ error: Error }>()
  }
});
