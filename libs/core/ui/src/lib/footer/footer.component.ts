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

  @Input() email: string = '';
  @Input() links: string[] = [];
  @Input() logo: string | null = null;
  @Input() phoneNumber: string = '';
  @Input() socialMedia: SocialMedia[] = [];

  @Output() routeChanged = new EventEmitter<string>();

  ngAfterViewInit(): void {
    initScrollTopButton(this.#el, this.#renderer);
  }

  onRouteChanged(route: string) {
    this.routeChanged.emit(route);
  }
}
