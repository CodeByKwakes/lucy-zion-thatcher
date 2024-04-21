import { Route } from '@angular/router';

export const blogsRoutes: Route[] = [
  {
    path: '',
    children: [
      {
        path: 'blogs',
        loadComponent: async () =>
          (await import('./blog-list/blog-list.component')).BlogListComponent
      },
      {
        path: 'blogs/:slug',
        loadComponent: async () =>
          (await import('./blog-detail/blog-detail.component'))
            .BlogDetailComponent
      }
    ]
  }
];
