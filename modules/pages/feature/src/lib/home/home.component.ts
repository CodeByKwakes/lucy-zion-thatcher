import { CommonModule } from '@angular/common';
import { Component, Signal, inject } from '@angular/core';
import { useCoreStore } from '@lzt/core/api';
import { PageStore } from '@lzt/pages/domain';
import { HomePage } from '@lzt/shared/models';
import { GetAssetPipe, SafeHtmlPipe } from '@lzt/shared/utils';
import { CarouselComponent } from '@lzt/testimonials/api';

@Component({
  imports: [CommonModule, GetAssetPipe, SafeHtmlPipe, CarouselComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  readonly #coreStore = useCoreStore();
  readonly #pageStore = inject(PageStore);

  readonly currentPage = this.#pageStore.selectCurrentPage as Signal<HomePage>;

  onRouteToPage(page: string): void {
    this.#coreStore.routeTo([page]);
  }
}
