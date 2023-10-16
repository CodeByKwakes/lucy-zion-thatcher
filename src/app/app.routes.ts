import { Route } from '@angular/router';
import { pagesGuard } from '@lzt/pages/data-access';

export const appRoutes: Route[] = [
  {
    path: '',
    canActivate: [pagesGuard],
    children: [
      {
        path: '',
        loadChildren: async () =>
          (await import('@lzt/pages/routes')).routesRoutes
      },
      {
        path: '',
        loadChildren: async () =>
          (await import('@lzt/blogs/routes')).routesRoutes
      }
    ]
  }
];
