import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  Signal,
  ViewChild,
  inject,
  signal
} from '@angular/core';
import { GlobalPage, PageStore } from '@lzt/core/api-pages';
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
  readonly #pageStore = inject(PageStore);
  readonly #renderer = inject(Renderer2);

  readonly globalPage = this.#pageStore.selectGlobalPage as Signal<GlobalPage>;
  readonly links = signal<string[]>([
    'home',
    'about',
    'speaker',
    'blogs',
    'contact'
  ]);
  readonly loaded = this.#pageStore.loaded;

  @ViewChild('preloader', { static: false }) preloader!: ElementRef;

  ngAfterViewInit(): void {
    // this.removeLoader();
    console.log('this.#el ngAfterViewInit', this.#el.nativeElement);
    this.initAos();
  }

  ngOnInit(): void {
    console.log('this.#el ngOnInit', this.#el);
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
