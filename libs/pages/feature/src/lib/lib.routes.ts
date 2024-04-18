import { Route } from '@angular/router';

export const pagesRoutes: Route[] = [
  {
    path: '',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      {
        path: 'home',
        loadComponent: async () =>
          (await import('./home/home.component')).HomeComponent
      },
      {
        path: 'about',
        loadComponent: async () =>
          (await import('./about/about.component')).AboutComponent
      },
      {
        path: 'speaker',
        loadComponent: async () =>
          (await import('./speaker/speaker.component')).SpeakerComponent
      },
      {
        path: 'contact',
        loadComponent: async () =>
          (await import('./contact/contact.component')).ContactComponent
      }
    ]
  }
];
