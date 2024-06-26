import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  input,
  output
} from '@angular/core';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';
import {
  initMobileNavToggle,
  useIsWindowScrollActive,
  mobileNavToggle
} from '@lzt/shared/utils';

@Component({
  selector: 'lib-header',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    RouterLinkActive,
    RouterLinkWithHref
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements AfterViewInit {
  readonly #el = inject(ElementRef);

  readonly isSticky$ = useIsWindowScrollActive();
  readonly links = input<string[]>([]);
  readonly logo = input<string | null>(null);

  routeChange = output<string>();

  ngAfterViewInit(): void {
    initMobileNavToggle(this.#el);
  }

  onRouteChanged(route: string) {
    const bodyEl = document.querySelector('body') as HTMLElement;
    const mobileNavShow = document.querySelector(
      '.mobile-nav--show'
    ) as HTMLElement;
    const mobileNavHide = document.querySelector(
      '.mobile-nav--hide'
    ) as HTMLElement;
    this.routeChange.emit(route);

    if (bodyEl.classList.contains('mobile-nav--active')) {
      mobileNavToggle(bodyEl, mobileNavShow, mobileNavHide);
    }
  }
}
