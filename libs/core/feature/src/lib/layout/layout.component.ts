import { CommonModule } from '@angular/common';
import { Component, Signal, computed } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { HomePage, usePageFeature } from '@lzt/core/api-pages';
import { useCoreStore } from '@lzt/core/data-access';

@Component({
  selector: 'lib-layout',
  standalone: true,
  imports: [CommonModule, RouterLinkActive],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  heroImage = 'assets/imgs/photos/bg-image_16_9.jpg';

  readonly $currentPage = usePageFeature().$currentPage;
  readonly $homePage = computed(() => this.$currentPage()) as Signal<HomePage>;
  readonly coreStore = useCoreStore();

  routeTo(path: unknown[], query?: object, extras?: object) {
    this.coreStore.routeTo(path, query, extras);
  }
}
