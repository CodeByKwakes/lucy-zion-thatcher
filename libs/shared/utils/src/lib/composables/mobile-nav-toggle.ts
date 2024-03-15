import { ElementRef } from '@angular/core';

/**
 * Toggles the mobile navigation menu.
 * @param bodyEl - The body element.
 * @param mobileNavShow - The mobile navigation show element.
 * @param mobileNavHide - The mobile navigation hide element.
 * @returns void
 */
export const mobileNavToggle = (
  bodyEl: HTMLElement,
  mobileNavShow: HTMLElement,
  mobileNavHide: HTMLElement
): void => {
  if (bodyEl) {
    bodyEl.classList.toggle('mobile-nav--active');
  }

  mobileNavShow.classList.toggle('d-none');
  mobileNavHide.classList.toggle('d-none');
};

/**
 * Initializes the mobile navigation toggle functionality.
 * @param el - The ElementRef of the component.
 * @returns void
 */
export const initMobileNavToggle = (el: ElementRef): void => {
  const mobileNavShow = el.nativeElement.querySelector('.mobile-nav--show');
  const mobileNavHide = el.nativeElement.querySelector('.mobile-nav--hide');
  const mobileNavToggleElements = el.nativeElement.querySelectorAll(
    '.mobile-nav--toggle'
  );

  const bodyEl = document.querySelector('body');

  if (!mobileNavShow || !mobileNavHide || !bodyEl) {
    console.error('Required elements not found in the DOM.');
    return; // Exit the function if any required element is missing.
  }

  mobileNavToggleElements.forEach((el: HTMLElement) => {
    el.addEventListener('click', (event) => {
      event.preventDefault();
      mobileNavToggle(bodyEl, mobileNavShow, mobileNavHide);
    });
  });
};
