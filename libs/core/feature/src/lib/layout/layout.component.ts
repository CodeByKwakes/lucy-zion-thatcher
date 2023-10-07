import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { selectUrl, useCoreStore } from '@lzt/core/data-access';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { RouterLinkActive } from '@angular/router';

@Component({
  selector: 'lib-layout',
  standalone: true,
  imports: [CommonModule, RouterLinkActive],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  heroImage = 'assets/imgs/photos/bg-image_16_9.jpg';
  page$ = inject(Store)
    .select(selectUrl)
    .pipe(map((url) => url.slice(1)));
  coreStore = useCoreStore();

  constructor() {
    inject(Store)
      .select(selectUrl)
      .subscribe((url) => console.log(url.slice(1)));
  }

  routeTo(path: unknown[], query?: object, extras?: object) {
    this.coreStore.routeTo(path, query, extras);
  }
}
