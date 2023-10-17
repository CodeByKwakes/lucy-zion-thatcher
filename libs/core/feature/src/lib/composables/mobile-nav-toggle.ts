import { ElementRef } from '@angular/core';

export function initMobileNavToggle(el: ElementRef): void {
  const mobileNavShow = el.nativeElement.querySelector('.mobile-nav-show');
  const mobileNavHide = el.nativeElement.querySelector('.mobile-nav-hide');
  const mobileNavToggleElements =
    el.nativeElement.querySelectorAll('.mobile-nav-toggle');

  const bodyEl = document.querySelector('body');

  if (!mobileNavShow || !mobileNavHide || !bodyEl) {
    console.error('Required elements not found in the DOM.');
    return; // Exit the function if any required element is missing.
  }

  mobileNavToggleElements.forEach((el: HTMLElement) => {
    el.addEventListener('click', mobileNavToggle);
  });

  function mobileNavToggle(event: Event) {
    event.preventDefault();
    if (bodyEl) {
      bodyEl.classList.toggle('mobile-nav-active');
    }

    mobileNavShow.classList.toggle('d-none');
    mobileNavHide.classList.toggle('d-none');
  }
}
