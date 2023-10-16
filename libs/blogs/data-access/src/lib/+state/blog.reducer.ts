import { selectRouter } from '@lzt/blogs/api-core';
import { BlogPost } from '@lzt/shared/models';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { BlogActions } from './blog.actions';

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
  extraSelectors: ({ selectBlogState, selectEntities }) => ({
    ...blogAdapter.getSelectors(selectBlogState),
    selectBlogFromRoute: createSelector(
      selectEntities,
      selectRouter,
      (entities, router) =>
        router.state.params['id'] ? entities[router.state.params['id']] : null
    )
  })
});

export const {
  selectIsLoaded,
  selectAll,
  selectTotal,
  selectEntities,
  selectBlogFromRoute
} = blogFeature;
