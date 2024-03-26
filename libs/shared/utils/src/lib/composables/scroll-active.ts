import { Observable, distinctUntilChanged, fromEvent, map } from 'rxjs';

/**
 * Checks if the window is actively being scrolled.
 * @returns An Observable that emits a boolean value indicating whether the window is actively being scrolled.
 */
export const isScrollActive = (): Observable<boolean> => {
  return fromEvent(window, 'scroll').pipe(
    map(() => window.scrollY),
    distinctUntilChanged(),
    map((scrollTop: number) => scrollTop > 100)
  );
};
