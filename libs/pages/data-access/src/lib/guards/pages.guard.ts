import { CanActivateFn } from '@angular/router';
import { usePageFeature } from '../+state';
import { switchMap, of, catchError } from 'rxjs';

/**
 * A guard that checks if the page store is available for use.
 * @returns An observable that emits a boolean value indicating whether the page store is available.
 */
export const pagesGuard: CanActivateFn = () => {
  return usePageFeature().checkPageStore.pipe(
    switchMap(() => of(true)),
    catchError(() => of(false))
  );
};
