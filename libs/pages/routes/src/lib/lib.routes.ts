import { Route } from '@angular/router';

export const pagesRoutes: Route[] = [
  {
    path: '',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      {
        path: 'home',
        loadComponent: async () =>
          (await import('@lzt/pages/feature')).HomeComponent
      },
      {
        path: 'about',
        loadComponent: async () =>
          (await import('@lzt/pages/feature')).AboutComponent
      },
      {
        path: 'speaker',
        loadComponent: async () =>
          (await import('@lzt/pages/feature')).SpeakerComponent
      },
      {
        path: 'contact',
        loadComponent: async () =>
          (await import('@lzt/pages/feature')).ContactComponent
      }
    ]
  }
];
