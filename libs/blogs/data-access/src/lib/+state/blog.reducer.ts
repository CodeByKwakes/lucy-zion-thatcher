import { createFeature, createReducer, on } from '@ngrx/store';
import { BlogActions } from './blog.actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { BlogPost } from '@lzt/shared/models';

export const blogFeatureKey = 'blog';

export interface State extends EntityState<BlogPost> {
  isLoading: boolean;
  isLoaded: boolean;
  error: Error | null;
}

export const blogAdapter = createEntityAdapter<BlogPost>({});

export const initialState: State = blogAdapter.getInitialState({
  isLoading: false,
  isLoaded: false,
  error: null
});

export const reducer = createReducer(
  initialState,
  on(BlogActions.loadBlogs, (state) => ({ ...state, isLoading: true })),
  on(BlogActions.loadBlogsSuccess, (state, { blogs }) =>
    blogAdapter.setAll(blogs, { ...state, isLoading: false, isLoaded: true })
  ),
  on(BlogActions.loadBlogsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  }))
);

export const blogFeature = createFeature({
  name: blogFeatureKey,
  reducer,
  extraSelectors: ({ selectBlogState }) => ({
    ...blogAdapter.getSelectors(selectBlogState)
  })
});

export const { selectIsLoaded, selectAll, selectTotal, selectEntities } =
  blogFeature;
