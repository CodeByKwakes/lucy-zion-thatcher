import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, EventEmitter, Output, input } from '@angular/core';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';
import { SocialMedia } from '@lzt/shared/models';
import { distinctUntilChanged, fromEvent, map } from 'rxjs';

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
export class FooterComponent {
  email = input('');
  links = input<string[]>([]);
  logo = input<string | null>(null);
  phoneNumber = input<string>('');
  socialMedia = input<SocialMedia[]>([]);
  isScrollTopActive$ = fromEvent(window, 'scroll').pipe(
    map(() => window.scrollY),
    distinctUntilChanged(),
    map((scrollTop: number) => scrollTop > 100)
  );

  @Output() routeChanged = new EventEmitter<string>();

  onRouteChanged(route: string): void {
    this.routeChanged.emit(route);
  }

  onScrollTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
