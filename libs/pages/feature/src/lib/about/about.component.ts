import { CommonModule } from '@angular/common';
import { Component, Signal, inject } from '@angular/core';
import { PageStore } from '@lzt/core/api';
import { AboutPage } from '@lzt/shared/models';
import { BreadcrumbsComponent } from '@lzt/shared/ui-components';
import { GetAssetPipe } from '@lzt/shared/utils';

@Component({
  selector: 'lib-about',
  standalone: true,
  imports: [CommonModule, BreadcrumbsComponent, GetAssetPipe],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  readonly #pageStore = inject(PageStore);

  readonly currentPage = this.#pageStore.selectCurrentPage as Signal<AboutPage>;
}
