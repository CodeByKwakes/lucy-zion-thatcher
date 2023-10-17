import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  Signal,
  computed,
  inject
} from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { GlobalPage, HomePage, usePageFeature } from '@lzt/core/api-pages';
import { useCoreStore } from '@lzt/core/data-access';
import AOS from 'aos';
import { fromEvent } from 'rxjs';
import {
  initMobileNavToggle,
  initScrollTopButton,
  initStickyHeader
} from '../composables';

@Component({
  selector: 'lib-layout',
  standalone: true,
  imports: [CommonModule, RouterLinkActive],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  readonly pageStore = usePageFeature();
  readonly coreStore = useCoreStore();

  readonly imagePath = this.pageStore.imagePathUrl;
  readonly $currentPage = this.pageStore.$currentPage;
  readonly $homePage = computed(() => this.$currentPage()) as Signal<HomePage>;
  readonly $globalPage = this.pageStore.$getPageBySlug(
    'global'
  ) as Signal<GlobalPage>;

  #el = inject(ElementRef);
  #renderer = inject(Renderer2);

  ngOnInit(): void {
    initStickyHeader(this.#el, this.#renderer);
    initScrollTopButton(this.#el, this.#renderer);
    initMobileNavToggle(this.#el);
  }

  /**
   * Navigates to the specified path.
   * @param path - An array of strings representing the path to navigate to.
   */
  routeTo(path: string[]): void {
    this.coreStore.routeTo(path);
  }

  private initAos() {
    const aosInit = () => {
      AOS.init({
        duration: 800,
        once: true,
        mirror: false
      });
    };

    fromEvent(window, 'load').subscribe(() => {
      console.log('aos init');
      aosInit();
    });
  }
}
