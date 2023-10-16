import { CanActivateFn } from '@angular/router';
import { map, switchMap, take } from 'rxjs';
import { useBlogFeature } from '../+state';

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

// export const blogExistsGuard = () => {
//   return () => {
//     const hasBlog = (id: string) => {
//       return useBlogFeature().entities$.pipe(
//         tap((entities) => console.log('hasBlog', id, entities)),
//         map((entities) => !!entities[id]),
//         take(1)
//       );
//     };

//     return (route: ActivatedRouteSnapshot) => {
//       return useBlogFeature().checkBlogStore.pipe(
//         switchMap(() => {
//           console.log('blogExistsGuard', route);
//           const id = route.params['id'];
//           console.log('blogExistsGuard', id);
//           return hasBlog(id);
//         })
//       );
//     };
//   };
// };
