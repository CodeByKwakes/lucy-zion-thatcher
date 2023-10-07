import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPage from './page.reducer';

export const selectPageState = createFeatureSelector<fromPage.State>(
  fromPage.pageFeatureKey
);
