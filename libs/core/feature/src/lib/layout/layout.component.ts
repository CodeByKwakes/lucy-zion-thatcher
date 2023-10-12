import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  inject,
  signal
} from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { GlobalPage, HomePage, usePageFeature } from '@lzt/core/api-pages';
import { useCoreStore } from '@lzt/core/data-access';
import AOS from 'aos';
import { fromEvent, throttleTime } from 'rxjs';

@Component({
  selector: 'lib-layout',
  standalone: true,
  imports: [CommonModule, RouterLinkActive],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  readonly #homeData: HomePage = {
    id: '50289afe-9834-43de-99e6-0745b2bb7a67',
    slug: 'home',
    title: 'Lucy Zion Thatcher',
    caption: 'Website Coming Soon - info@lucyzionthatcher.com',
    header_image: 'assets/imgs/photos/bg-image_16_9.jpg'
  };

  readonly #globalData: GlobalPage = {
    id: '1141c65e-6665-4e56-9b0d-ad671c13b8be',
    logo: '54f82820-b692-450d-9919-f0a1393ae736',
    email: 'info@lucyzionthatcher.com',
    phone_number: '0207 274 8248',
    social_media: [
      {
        name: 'instagram',
        link: 'https://www.instagram.com/lucyzionthatcher'
      },
      {
        name: 'linkedin',
        link: 'https://www.linkedin.com/in/lucy-zion-thatcher-a8483619b'
      },
      {
        name: 'tiktok',
        link: 'https://www.tiktok.com/@lucyzionthatcher'
      },
      {
        name: 'twitter',
        link: 'https://twitter.com/aim4zion'
      }
    ],
    slug: 'global'
  };

  readonly pageStore = usePageFeature();
  readonly coreStore = useCoreStore();

  readonly imagePath = this.pageStore.imagePathUrl;
  readonly $currentPage = this.pageStore.$currentPage;
  readonly $homePage = signal(this.#homeData);
  readonly $globalPage = signal(this.#globalData);

  #el = inject(ElementRef);
  #renderer = inject(Renderer2);

  ngOnInit(): void {
    // this.initAos();
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
