import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Signal,
  inject,
  signal
} from '@angular/core';
import { GlobalPage, PageStore } from '@lzt/core/api-pages';
import { useCoreStore } from '@lzt/core/data-access';
import { FooterComponent, HeaderComponent } from '@lzt/core/ui';
import { GetAssetPipe } from '@lzt/shared/utils';
import AOS from 'aos';

@Component({
  selector: 'lib-layout',
  standalone: true,
  imports: [CommonModule, GetAssetPipe, HeaderComponent, FooterComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements AfterViewInit {
  readonly #coreStore = useCoreStore();
  readonly #pageStore = inject(PageStore);

  readonly globalPage = this.#pageStore.selectGlobalPage as Signal<GlobalPage>;
  readonly links = signal<string[]>([
    'home',
    'about',
    'speaker',
    'blogs',
    'contact'
  ]);
  readonly loaded = this.#pageStore.loaded;

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
    console.log('aos init');
  }
}
