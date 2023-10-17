import { ElementRef, Renderer2 } from '@angular/core';
import { fromEvent, throttleTime } from 'rxjs';

export function initScrollTopButton(el: ElementRef, renderer: Renderer2) {
  const scrollTop = el.nativeElement.querySelector('.scroll-top');

  if (scrollTop) {
    const togglescrollTop = () => {
      window.scrollY > 100
        ? renderer.addClass(scrollTop, 'active')
        : renderer.removeClass(scrollTop, 'active');
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
  }
}
