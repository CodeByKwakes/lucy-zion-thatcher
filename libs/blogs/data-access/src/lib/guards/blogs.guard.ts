import { CanActivateFn } from '@angular/router';
import { useBlogFeature } from '../+state';
import { switchMap, of, catchError } from 'rxjs';

export const blogsGuard: CanActivateFn = () => {
  return useBlogFeature().checkBlogStore.pipe(
    switchMap(() => of(true)),
    catchError(() => of(false))
  );
};

// export const blogsGuard = () => {
//   console.log('blogsGuard');
//   return () => {
//     console.log('blogsGuard after');
//     return useBlogFeature().checkBlogStore.pipe(
//       switchMap(() => of(true)),
//       catchError(() => of(false))
//     );
//   };
// };
// canActivate: [blogsGuard()];
