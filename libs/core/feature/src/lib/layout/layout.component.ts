import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  Signal,
  ViewChild,
  inject
} from '@angular/core';
import { GlobalPage, usePageFeature } from '@lzt/core/api-pages';
import { useCoreStore } from '@lzt/core/data-access';
import { FooterComponent, HeaderComponent } from '@lzt/core/ui';
import { GetAssetPipe } from '@lzt/shared/utils';
import AOS from 'aos';
import {
  initMobileNavToggle,
  initScrollTopButton,
  initStickyHeader
} from '../composables';

@Component({
  selector: 'lib-layout',
  standalone: true,
  imports: [CommonModule, GetAssetPipe, HeaderComponent, FooterComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, AfterViewInit {
  readonly #coreStore = useCoreStore();
  readonly #el = inject(ElementRef);
  readonly #pageStore = usePageFeature();
  readonly #renderer = inject(Renderer2);

  readonly $globalPage = this.#pageStore.$getPageBySlug(
    'global'
  ) as Signal<GlobalPage>;
  readonly links: string[] = ['home', 'about', 'speaker', 'blogs', 'contact'];

  @ViewChild('preloader', { static: false }) preloader!: ElementRef;

  ngAfterViewInit(): void {
    // this.removeLoader();
    this.initAos();
  }

  ngOnInit(): void {
    initStickyHeader(this.#el, this.#renderer);
    initScrollTopButton(this.#el, this.#renderer);
    initMobileNavToggle(this.#el);
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

  private removeLoader() {
    if (this.preloader) {
      console.log('preloader remove');
      this.preloader.nativeElement.remove();
    }
  }
}
