import { createFeature, createReducer, on } from '@ngrx/store';
import { PageActions } from './page.actions';
import { PageDataModel } from '@lzt/pages/models';

export const pageFeatureKey = 'page';

export interface State {
  data: PageDataModel | [];
  isLoading: boolean;
  error: Error | null;
}

export const initialState: State = {
  data: [],
  isLoading: false,
  error: null
};

export const reducer = createReducer(
  initialState,
  on(PageActions.loadPages, (state) => ({ ...state, isLoading: true })),
  on(PageActions.loadPagesSuccess, (state, { data }) => ({
    ...state,
    data,
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

export const { selectData } = pageFeature;
