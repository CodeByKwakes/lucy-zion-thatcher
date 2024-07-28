import { Route } from '@angular/router';

export const pagesRoutes: Route[] = [
  {
    path: '',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      {
        path: 'home',
        title: 'Home | Lucy Zion Thatcher',
        loadComponent: async () =>
          (await import('./home/home.component')).HomeComponent
      },
      {
        path: 'about',
        title: 'About Lucy | Lucy Zion Thatcher',
        loadComponent: async () =>
          (await import('./about/about.component')).AboutComponent
      },
      {
        path: 'speaker',
        title: 'Lucy - The Speaker | Lucy Zion Thatcher',
        loadComponent: async () =>
          (await import('./speaker/speaker.component')).SpeakerComponent
      },
      {
        path: 'contact',
        title: 'Contact Lucy | Lucy Zion Thatcher',
        loadComponent: async () =>
          (await import('./contact/contact.component')).ContactComponent
      }
    ]
  }
];
