import { CommonModule } from '@angular/common';
import { Component, Signal, computed } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { DIRECTUS_URL, HomePage, usePageFeature } from '@lzt/core/api-pages';
import { useCoreStore } from '@lzt/core/data-access';

@Component({
  selector: 'lib-layout',
  standalone: true,
  imports: [CommonModule, RouterLinkActive],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  readonly $currentPage = usePageFeature().$currentPage;
  readonly $homePage = computed(() => this.$currentPage()) as Signal<HomePage>;
  readonly coreStore = useCoreStore();
  readonly baseUrl = `${DIRECTUS_URL}/assets/`;

  routeTo(path: unknown[], query?: object, extras?: object) {
    this.coreStore.routeTo(path, query, extras);
  }
}
