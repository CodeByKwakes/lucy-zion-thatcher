import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  inject
} from '@angular/core';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';
import { initMobileNavToggle, initStickyHeader } from '@lzt/shared/utils';

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

  @Input() links: string[] = [];
  @Input() logo: string | null = null;
  @Output() routeChanged = new EventEmitter<string>();

  ngAfterViewInit(): void {
    initStickyHeader(this.#el, this.#renderer);
    initMobileNavToggle(this.#el);
  }

  onRouteChanged(route: string) {
    this.routeChanged.emit(route);
  }
}
