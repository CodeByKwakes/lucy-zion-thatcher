import { PageEntity } from '@lzt/pages/models';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { PageActions } from './page.actions';
import { selectUrl } from '@lzt/pages/api-core';
import { cr } from '@directus/sdk/dist/index-5c47c85c';

export const pageFeatureKey = 'page';

export interface State extends EntityState<PageEntity> {
  isLoading: boolean;
  error: Error | null;
}

export const pageAdapter = createEntityAdapter<PageEntity>({
  selectId: (page) => page.slug
});

export const initialState: State = pageAdapter.getInitialState({
  isLoading: false,
  error: null
});

export const reducer = createReducer(
  initialState,
  on(PageActions.loadPages, (state) => ({ ...state, isLoading: true })),
  on(PageActions.loadPagesSuccess, (state, { pages }) =>
    pageAdapter.setAll(pages, { ...state, isLoading: false })
  ),
  on(PageActions.loadPagesFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  }))
);

export const pageFeature = createFeature({
  name: pageFeatureKey,
  reducer,
  extraSelectors: ({ selectPageState, selectEntities }) => ({
    ...pageAdapter.getSelectors(selectPageState),
    selectCurrentPage: createSelector(
      selectEntities,
      selectUrl,
      (entities, url) => entities[url.slice(1)] || null
    )
  })
});

export const { selectCurrentPage } = pageFeature;
