import { RouterReducerState, getRouterSelectors } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterStateUrl } from '../utils/custom-serializer';

export const selectRouterState =
  createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');

export const selectRouteByParam = createSelector(
  selectRouterState,
  (router) => router.state.params
);

export const {
  selectCurrentRoute,
  selectRouteParam,
  selectRouteParams,
  selectQueryParam,
  selectQueryParams,
  selectRouteData,
  selectUrl
} = getRouterSelectors();
