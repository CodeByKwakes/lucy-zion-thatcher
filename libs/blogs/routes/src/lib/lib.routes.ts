import { Route } from '@angular/router';
import {
  blogExistsGuard,
  blogsGuard,
  provideBlogFeature
} from '@lzt/blogs/data-access';

export const routesRoutes: Route[] = [
  {
    path: '',
    providers: [provideBlogFeature()],
    children: [
      // { path: '', pathMatch: 'full', redirectTo: 'blog-list' },
      {
        path: 'blogs',
        loadComponent: async () =>
          (await import('@lzt/blogs/feature')).BlogListComponent,
        canActivate: [blogsGuard]
      },
      {
        path: 'blogs/:blogId',
        loadComponent: async () =>
          (await import('@lzt/blogs/feature')).BlogDetailComponent,
        canActivate: [blogExistsGuard]
      }
    ]
  }
];
