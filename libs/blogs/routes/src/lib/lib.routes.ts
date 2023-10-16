import { Route } from '@angular/router';
import { blogsGuard, provideBlogFeature } from '@lzt/blogs/data-access';

export const blogsRoutes: Route[] = [
  {
    path: '',
    providers: [provideBlogFeature()],
    children: [
      {
        path: 'blogs',
        loadComponent: async () =>
          (await import('@lzt/blogs/feature')).BlogListComponent,
        canActivate: [blogsGuard]
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
