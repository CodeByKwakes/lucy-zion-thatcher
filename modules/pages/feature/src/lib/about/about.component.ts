import { CommonModule } from '@angular/common';
import { Component, Signal, inject } from '@angular/core';
import { PageStore } from '@lzt/pages/domain';
import { PageContentComponent } from '@lzt/pages/ui';
import { AboutPage } from '@lzt/shared/models';
import { PageHeaderComponent } from '@lzt/shared/ui';
import { GetAssetPipe } from '@lzt/shared/utils';

@Component({
  selector: 'lib-about',
  imports: [
    CommonModule,
    PageHeaderComponent,
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
