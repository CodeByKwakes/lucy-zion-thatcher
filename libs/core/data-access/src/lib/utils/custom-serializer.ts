import {
  ActivatedRouteSnapshot,
  Data,
  Params,
  RouterStateSnapshot
} from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';

export interface RouterState {
  url: string;
  params: Params;
  queryParams: Params;
  data: Data;
}

export class CustomSerializer implements RouterStateSerializer<RouterState> {
  serialize = (state: RouterStateSnapshot): RouterState => ({
    url: state.url,
    params: mergeRouteParams(state.root, ({ params }) => params),
    queryParams: mergeRouteParams(state.root, ({ queryParams }) => queryParams),
    data: mergeRouteData(state.root)
  });
}

const mergeRouteParams = (
  route: ActivatedRouteSnapshot,
  getter: (activatedRoute: ActivatedRouteSnapshot) => Params
): Params =>
  route
    ? {
        ...getter(route),
        ...mergeRouteParams(
          (route.children.find(({ outlet }) => outlet === 'primary') ||
            route.firstChild) as ActivatedRouteSnapshot,
          getter
        )
      }
    : {};

const mergeRouteData = (route: ActivatedRouteSnapshot): Data =>
  route
    ? {
        ...route.data,
        ...mergeRouteData(
          (route.children.find(({ outlet }) => outlet === 'primary') ||
            route.firstChild) as ActivatedRouteSnapshot
        )
      }
    : {};

// export class CustomSerializer implements RouterStateSerializer<RouterState> {
//   serialize(routerState: RouterStateSnapshot): RouterState {
//     let route = routerState.root;

//     while (route.firstChild) {
//       route = route.firstChild;
//     }

//     const {
//       url,
//       root: { queryParams }
//     } = routerState;
//     const { params } = route;

//     // Only return an object including the URL, params and query params
//     // instead of the entire snapshot
//     return { url, params, queryParams };
//   }
// }
