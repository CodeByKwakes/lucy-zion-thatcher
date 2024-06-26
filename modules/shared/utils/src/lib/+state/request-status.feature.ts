import { computed } from '@angular/core';
import { signalStoreFeature, withComputed, withState } from '@ngrx/signals';

export type RequestStatus =
  | 'idle'
  | 'pending'
  | 'fulfilled'
  | { error: string };
export type RequestStatusState = { status: RequestStatus };

export function withRequestStatus() {
  return signalStoreFeature(
    withState<RequestStatusState>({ status: 'idle' }),
    withComputed(({ status }) => ({
      isLoading: computed(() => status() === 'pending'),
      hasLoaded: computed(() => status() === 'fulfilled'),
      error: computed(() => {
        const getStatus = status();
        return typeof getStatus === 'object' ? getStatus.error : null;
      })
    }))
  );
}

export function setPending(): RequestStatusState {
  return { status: 'pending' };
}

export function setFulfilled(): RequestStatusState {
  return { status: 'fulfilled' };
}

export function setError(error: string): RequestStatusState {
  return { status: { error } };
}
