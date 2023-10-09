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
import { fromEvent, throttleTime } from 'rxjs';

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
    this.initStickyHeader();
    this.initScrollTopButton();
    this.initMobileNavToggle();
  }

  routeTo(path: unknown[], query?: object, extras?: object) {
    this.coreStore.routeTo(path, query, extras);
  }

  private initStickyHeader() {
    const selectHeader = this.#el.nativeElement.querySelector('#header');
    if (selectHeader) {
      fromEvent(window, 'scroll')
        .pipe(throttleTime(100))
        .subscribe(() => {
          window.scrollY > 100
            ? this.#renderer.addClass(selectHeader, 'sticked')
            : this.#renderer.removeClass(selectHeader, 'sticked');
        });
    }
  }

  private initMobileNavToggle() {
    const mobileNavShow =
      this.#el.nativeElement.querySelector('.mobile-nav-show');
    const mobileNavHide =
      this.#el.nativeElement.querySelector('.mobile-nav-hide');
    const mobileNavToggleElements =
      this.#el.nativeElement.querySelectorAll('.mobile-nav-toggle');

    const bodyEl = document.querySelector('body');

    if (!mobileNavShow || !mobileNavHide || !bodyEl) {
      console.error('Required elements not found in the DOM.');
      return; // Exit the function if any required element is missing.
    }

    mobileNavToggleElements.forEach((el: HTMLElement) => {
      el.addEventListener('click', mobileNavToggle);
    });

    function mobileNavToggle(event: Event) {
      event.preventDefault();
      if (bodyEl) {
        bodyEl.classList.toggle('mobile-nav-active');
      }
      mobileNavShow.classList.toggle('d-none');
      mobileNavHide.classList.toggle('d-none');
    }
  }

  private initScrollTopButton() {
    const scrollTop = this.#el.nativeElement.querySelector('.scroll-top');
    if (scrollTop) {
      const togglescrollTop = () => {
        window.scrollY > 100
          ? this.#renderer.addClass(scrollTop, 'active')
          : this.#renderer.removeClass(scrollTop, 'active');
      };

      fromEvent(window, 'load').subscribe(togglescrollTop);

      fromEvent(document, 'scroll')
        .pipe(throttleTime(100))
        .subscribe(togglescrollTop);

      fromEvent(scrollTop, 'click').subscribe(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }
}
