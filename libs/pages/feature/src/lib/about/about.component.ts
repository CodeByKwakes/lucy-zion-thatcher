import { CommonModule } from '@angular/common';
import { Component, Signal, inject } from '@angular/core';
import { PageStore } from '@lzt/pages/data-access';
import { PageContentComponent } from '@lzt/pages/ui';
import { AboutPage } from '@lzt/shared/models';
import { BreadcrumbsComponent } from '@lzt/shared/ui-components';
import { GetAssetPipe } from '@lzt/shared/utils';

@Component({
  selector: 'lib-about',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbsComponent,
    GetAssetPipe,
    PageContentComponent
  ],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  readonly #pageStore = inject(PageStore);

  readonly currentPage = this.#pageStore.selectCurrentPage as Signal<AboutPage>;
}
