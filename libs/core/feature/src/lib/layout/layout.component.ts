import { CommonModule } from '@angular/common';
import { Component, Signal, computed } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { GlobalPage, HomePage, usePageFeature } from '@lzt/core/api-pages';
import { useCoreStore } from '@lzt/core/data-access';

@Component({
  selector: 'lib-layout',
  standalone: true,
  imports: [CommonModule, RouterLinkActive],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  readonly pageStore = usePageFeature();
  readonly coreStore = useCoreStore();

  readonly imagePath = this.pageStore.imagePathUrl;
  readonly $currentPage = this.pageStore.$currentPage;
  readonly $homePage = computed(() => this.$currentPage()) as Signal<HomePage>;
  readonly $globalPage = this.pageStore.$getPageBySlug(
    'global'
  ) as Signal<GlobalPage>;

  routeTo(path: unknown[], query?: object, extras?: object) {
    this.coreStore.routeTo(path, query, extras);
  }
}
