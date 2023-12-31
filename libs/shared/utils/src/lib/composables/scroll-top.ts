import { ElementRef, Renderer2 } from '@angular/core';
import { fromEvent, throttleTime } from 'rxjs';

/**
 * Initializes the scroll top button functionality.
 * @param el - The ElementRef of the scroll top button.
 * @param renderer - The Renderer2 used to manipulate the DOM.
 * @returns void
 */
export const initScrollTopButton = (
  el: ElementRef,
  renderer: Renderer2
): void => {
  const scrollTop = el.nativeElement.querySelector('.scroll-top');

  if (!scrollTop) {
    return;
  }

  const togglescrollTop = () => {
    if (window.scrollY > 100) {
      renderer.addClass(scrollTop, 'active');
      return;
    }

    renderer.removeClass(scrollTop, 'active');
  };

  const toggleScrollTo = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  fromEvent(window, 'load').subscribe(togglescrollTop);

  fromEvent(document, 'scroll')
    .pipe(throttleTime(100))
    .subscribe(togglescrollTop);

  fromEvent(scrollTop, 'click').subscribe(toggleScrollTo);
};
