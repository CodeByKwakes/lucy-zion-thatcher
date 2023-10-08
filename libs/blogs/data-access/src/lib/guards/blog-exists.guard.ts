import { CanActivateFn } from '@angular/router';
import { useBlogFeature } from '../+state';
import { map, switchMap, take } from 'rxjs';

const hasBlog = (id: string) =>
  useBlogFeature().entities$.pipe(
    map((entities) => !!entities[id]),
    take(1)
  );

export const blogExistsGuard: CanActivateFn = (route) => {
  return useBlogFeature().checkBlogStore.pipe(
    switchMap(() => {
      const id = route.params['blogId'];
      return hasBlog(id);
    })
  );
};
