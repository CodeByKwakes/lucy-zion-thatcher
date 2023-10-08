import { CanActivateFn } from '@angular/router';
import { usePageFeature } from '../+state';
import { switchMap, of, catchError } from 'rxjs';

export const pagesGuard: CanActivateFn = () => {
  return usePageFeature().checkPageStore.pipe(
    switchMap(() => of(true)),
    catchError(() => of(false))
  );
};
