import { Route } from '@angular/router';

export const blogsRoutes: Route[] = [
  {
    path: '',
    children: [
      {
        path: 'blogs',
        loadComponent: async () =>
          (await import('@lzt/blogs/feature')).BlogListComponent
      },
      {
        path: 'blogs/:id',
        loadComponent: async () =>
          (await import('@lzt/blogs/feature')).BlogDetailComponent
      }
    ]
  }
];
