import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { SocialMedia } from '@lzt/shared/models';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';

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
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  @Input() socialMedia: SocialMedia[] = [];
  @Input() links: string[] = [];
  @Input() logo: string | null = null;
  @Input() phoneNumber: string = '';
  @Input() email: string = '';

  @Output() routeChanged = new EventEmitter<string>();

  onRouteChanged(route: string) {
    this.routeChanged.emit(route);
  }
}
