import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  Renderer2,
  inject,
  input
} from '@angular/core';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';
import {
  initMobileNavToggle,
  initStickyHeader,
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
  readonly #renderer = inject(Renderer2);

  links = input<string[]>([]);
  logo = input<string | null>(null);
  @Output() routeChanged = new EventEmitter<string>();

  ngAfterViewInit(): void {
    initStickyHeader(this.#el, this.#renderer);
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
    this.routeChanged.emit(route);

    if (bodyEl.classList.contains('mobile-nav--active')) {
      mobileNavToggle(bodyEl, mobileNavShow, mobileNavHide);
    }
  }
}
