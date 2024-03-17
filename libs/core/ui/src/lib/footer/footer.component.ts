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
import { SocialMedia } from '@lzt/shared/models';
import { initScrollTopButton } from '@lzt/shared/utils';

@Component({
  selector: 'lib-footer',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    RouterLinkActive,
    RouterLinkWithHref
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements AfterViewInit {
  readonly #el = inject(ElementRef);
  readonly #renderer = inject(Renderer2);

  email = input('');
  links = input<string[]>([]);
  logo = input<string | null>(null);
  phoneNumber = input<string>('');
  socialMedia = input<SocialMedia[]>([]);

  @Output() routeChanged = new EventEmitter<string>();

  ngAfterViewInit(): void {
    initScrollTopButton(this.#el, this.#renderer);
  }

  onRouteChanged(route: string) {
    this.routeChanged.emit(route);
  }
}
