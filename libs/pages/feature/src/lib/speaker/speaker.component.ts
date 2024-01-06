import { CommonModule } from '@angular/common';
import { Component, Signal, inject } from '@angular/core';
import { PageStore } from '@lzt/pages/data-access';
import { PageContentComponent } from '@lzt/pages/ui';
import { SpeakerPage } from '@lzt/shared/models';
import { BreadcrumbsComponent } from '@lzt/shared/ui-components';

@Component({
  selector: 'lib-speaker',
  standalone: true,
  imports: [CommonModule, BreadcrumbsComponent, PageContentComponent],
  templateUrl: './speaker.component.html',
  styleUrls: ['./speaker.component.scss']
})
export class SpeakerComponent {
  readonly #pageStore = inject(PageStore);

  readonly currentPage = this.#pageStore
    .selectCurrentPage as Signal<SpeakerPage>;
}
