import { CommonModule } from '@angular/common';
import { Component, Signal, inject } from '@angular/core';
import { useCoreStore } from '@lzt/pages/api-core';
import { PageStore } from '@lzt/pages/data-access';
import { HomePage } from '@lzt/shared/models';
import { GetAssetPipe } from '@lzt/shared/utils';

@Component({
  standalone: true,
  imports: [CommonModule, GetAssetPipe],
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
