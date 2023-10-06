import { getRouterSelectors } from '@ngrx/router-store';

export const {
  selectCurrentRoute,
  selectRouteParam,
  selectRouteParams,
  selectQueryParam,
  selectQueryParams,
  selectRouteData
} = getRouterSelectors();
