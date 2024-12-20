import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Signal,
  inject,
  signal
} from '@angular/core';
import { useCoreStore } from '@lzt/core/domain';
import { FooterComponent, HeaderComponent } from '@lzt/core/ui';
import { PageStore } from '@lzt/pages/api';
import { GlobalPage } from '@lzt/shared/models';
import { GetAssetPipe } from '@lzt/shared/utils';
import AOS from 'aos';
import { NAV_LINKS } from '../constants';

@Component({
  selector: 'lib-layout',
  imports: [CommonModule, GetAssetPipe, HeaderComponent, FooterComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements AfterViewInit {
  readonly #coreStore = useCoreStore();
  readonly #pageStore = inject(PageStore);

  readonly globalPage = this.#pageStore.selectGlobalPage as Signal<GlobalPage>;
  readonly links = signal<string[]>(NAV_LINKS);
  readonly hasPagesLoaded = this.#pageStore.hasLoaded;

  ngAfterViewInit(): void {
    this.initAos();
  }

  onRouteToPage(page: string): void {
    this.#coreStore.routeTo([page]);
  }

  private initAos() {
    AOS.init({
      duration: 800,
      once: true,
      mirror: false
    });
  }
}
