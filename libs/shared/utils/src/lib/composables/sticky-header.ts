import { ElementRef, Renderer2 } from '@angular/core';
import { fromEvent, throttleTime } from 'rxjs';

/**
 * Initializes a sticky header on the given element.
 * @param el - The element to attach the sticky header to.
 * @param renderer - The renderer to use for adding and removing classes.
 */
export const initStickyHeader = (el: ElementRef, renderer: Renderer2): void => {
  const header = el.nativeElement.querySelector('#header');

  const togglescrollTop = () => {
    if (window.scrollY > 100) {
      renderer.addClass(header, 'sticked');
      return;
    }

    renderer.removeClass(header, 'sticked');
  };

  if (header) {
    fromEvent(window, 'scroll')
      .pipe(throttleTime(100))
      .subscribe(togglescrollTop);
  }
};
