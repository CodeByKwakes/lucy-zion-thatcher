import { PageArray } from '@lzt/pages/models';
import { createFeature, createReducer, on } from '@ngrx/store';
import { PageActions } from './page.actions';

export const pageFeatureKey = 'page';

export interface State {
  pages: PageArray;
  isLoading: boolean;
  error: Error | null;
}

export const initialState: State = {
  pages: [],
  isLoading: false,
  error: null
};

export const reducer = createReducer(
  initialState,
  on(PageActions.loadPages, (state) => ({ ...state, isLoading: true })),
  on(PageActions.loadPagesSuccess, (state, { pages }) => ({
    ...state,
    pages,
    isLoading: false
  })),
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
