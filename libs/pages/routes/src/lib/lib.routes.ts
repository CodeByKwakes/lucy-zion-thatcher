import { Route } from '@angular/router';
import { providePageFeature } from '@lzt/pages/data-access';

export const routesRoutes: Route[] = [
  {
    path: '',
    providers: [providePageFeature()],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      {
        path: 'home',
        loadComponent: async () =>
          (await import('@lzt/pages/feat-home')).HomeComponent
      },
      {
        path: 'about',
        loadComponent: async () =>
          (await import('@lzt/pages/feat-home')).AboutComponent
      },
      {
        path: 'speaker',
        loadComponent: async () =>
          (await import('@lzt/pages/feat-home')).SpeakerComponent
      }
    ]
  }
];
