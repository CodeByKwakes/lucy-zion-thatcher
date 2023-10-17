import { ElementRef, Renderer2 } from '@angular/core';
import { fromEvent, throttleTime } from 'rxjs';

export function initStickyHeader(el: ElementRef, renderer: Renderer2) {
  const header = el.nativeElement.querySelector('#header');

  const togglescrollTop = () => {
    window.scrollY > 100
      ? renderer.addClass(header, 'sticked')
      : renderer.removeClass(header, 'sticked');
  };

  if (header) {
    fromEvent(window, 'scroll')
      .pipe(throttleTime(100))
      .subscribe(togglescrollTop);
  }
}
