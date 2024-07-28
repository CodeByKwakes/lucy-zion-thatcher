import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  Signal,
  ViewChild,
  inject,
  AfterViewInit
} from '@angular/core';
import { useCoreStore } from '@lzt/core/api';
import { PageStore } from '@lzt/pages/domain';
import { HomePage } from '@lzt/shared/models';
import { GetAssetPipe, SafeHtmlPipe } from '@lzt/shared/utils';
import { TestimonialStore } from '@lzt/testimonials/api';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';

@Component({
  standalone: true,
  imports: [CommonModule, GetAssetPipe, SafeHtmlPipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [TestimonialStore]
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('swiper') swiper!: ElementRef<SwiperContainer>;

  readonly #coreStore = useCoreStore();
  readonly #pageStore = inject(PageStore);
  readonly #testimonialStore = inject(TestimonialStore);

  readonly currentPage = this.#pageStore.selectCurrentPage as Signal<HomePage>;
  readonly testimonials = this.#testimonialStore.testimonialEntities;

  ngAfterViewInit() {
    const swiperParams = {
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 40
        },

        1200: {
          slidesPerView: 3
        }
      }
    } as SwiperOptions;

    Object.assign(this.swiper.nativeElement, swiperParams);
    this.swiper.nativeElement.initialize();
  }

  onRouteToPage(page: string): void {
    this.#coreStore.routeTo([page]);
  }
}
