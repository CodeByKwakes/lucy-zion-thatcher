import { RouterReducerState, getRouterSelectors } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterState } from '../utils/custom-serializer';

export const selectRouterState =
  createFeatureSelector<RouterReducerState<RouterState>>('router');

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
