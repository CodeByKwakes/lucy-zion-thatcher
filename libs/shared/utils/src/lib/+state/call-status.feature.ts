import { computed } from '@angular/core';
import { signalStoreFeature, withComputed, withState } from '@ngrx/signals';

export type CallStatus = 'init' | 'loading' | 'loaded' | { error: string };
export type CallStatusState = { callStatus: CallStatus };

export function withCallStatus() {
  return signalStoreFeature(
    withState<CallStatusState>({ callStatus: 'init' }),
    withComputed(({ callStatus }) => ({
      loading: computed(() => callStatus() === 'loading'),
      loaded: computed(() => callStatus() === 'loaded'),
      error: computed(() => {
        const status = callStatus();
        return typeof status === 'object' ? status.error : null;
      })
    }))
  );
}

export function setLoading(): CallStatusState {
  return { callStatus: 'loading' };
}

export function setLoaded(): CallStatusState {
  return { callStatus: 'loaded' };
}

export function setError(error: string): CallStatusState {
  return { callStatus: { error } };
}
