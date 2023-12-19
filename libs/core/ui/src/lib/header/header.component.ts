import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';

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
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Input() links: string[] = [];
  @Input() logo: string | null = null;

  @Output() routeChanged = new EventEmitter<string>();

  onRouteChanged(route: string) {
    this.routeChanged.emit(route);
  }
}
