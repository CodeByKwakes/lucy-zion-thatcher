import { PageEntity } from '@lzt/pages/models';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import { PageActions } from './page.actions';

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
  reducer
});
