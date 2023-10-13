import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withHashLocation
} from '@angular/router';
import { appRoutes } from './app.routes';
import { provideCoreStore } from '@lzt/core/data-access';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      appRoutes,
      withHashLocation(),
      withEnabledBlockingInitialNavigation()
    ),
    provideCoreStore()
  ]
};
