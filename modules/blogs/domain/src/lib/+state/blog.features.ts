import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { withStateLogging, withRequestStatus } from '@lzt/shared/utils';
import { signalStoreFeature } from '@ngrx/signals';

export function withBlogFeatures() {
  return signalStoreFeature(
    withDevtools('blogs'),
    withRequestStatus(),
    withStateLogging('blogs')
  );
}
