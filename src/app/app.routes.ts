import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: async () =>
          (await import('@lzt/pages/routes')).pagesRoutes
      },
      {
        path: '',
        loadChildren: async () =>
          (await import('@lzt/blogs/routes')).blogsRoutes
      }
    ]
  }
];
