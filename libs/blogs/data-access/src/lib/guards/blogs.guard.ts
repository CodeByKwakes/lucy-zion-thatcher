import { CanActivateFn } from '@angular/router';
import { useBlogFeature } from '../+state';
import { switchMap, of, catchError } from 'rxjs';

export const blogsGuard: CanActivateFn = () => {
  return useBlogFeature().checkBlogStore.pipe(
    switchMap(() => of(true)),
    catchError(() => of(false))
  );
};
