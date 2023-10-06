import { Route } from '@angular/router';

export const routesRoutes: Route[] = [
  {
    path: '',

    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      {
        path: 'home',
        loadComponent: async () =>
          (await import('@lzt/pages/feat-home')).FeatHomeComponent,
      },
    ],
  },
];
