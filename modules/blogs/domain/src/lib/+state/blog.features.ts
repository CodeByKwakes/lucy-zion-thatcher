import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { withLogger, withRequestStatus } from '@lzt/shared/utils';
import { signalStoreFeature } from '@ngrx/signals';

export function withBlogFeatures() {
  return signalStoreFeature(
    withDevtools('blogs'),
    withRequestStatus(),
    withLogger('blogs')
  );
}
