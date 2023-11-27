import { Route } from '@angular/router';
import { blogsGuard, provideBlogFeature } from '@lzt/blogs/data-access';

export const blogsRoutes: Route[] = [
  {
    path: '',
    providers: [provideBlogFeature()],
    canActivate: [blogsGuard],
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
        // canActivate: [blogExistsGuard]
      }
    ]
  }
];
