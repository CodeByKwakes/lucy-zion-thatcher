import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { SocialMedia } from '@lzt/shared/models';
import { useIsWindowScrollActive } from '@lzt/shared/utils';

@Component({
  selector: 'lib-footer',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  email = input('');
  links = input<string[]>([]);
  logo = input<string | null>(null);
  phoneNumber = input<string>('');
  socialMedia = input<SocialMedia[]>([]);
  isScrollTopActive$ = useIsWindowScrollActive();

  routeChange = output<string>();

  onRouteChanged(route: string): void {
    this.routeChange.emit(route);
  }

  onScrollTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
