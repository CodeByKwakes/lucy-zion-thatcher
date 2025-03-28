import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  inject,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { TestimonialStore } from '@lzt/testimonials/domain';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';

@Component({
  selector: 'lib-carousel',
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [TestimonialStore]
})
export class CarouselComponent implements AfterViewInit {
  @ViewChild('swiper') swiper!: ElementRef<SwiperContainer>;

  readonly #testimonialStore = inject(TestimonialStore);
  readonly testimonials = this.#testimonialStore.pageTestimonials;

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
      },
      injectStyles: [
        `.swiper-button-prev, .swiper-button-next {
            color: var(--accent);
          }

          .swiper-pagination-bullet-active {
            background-color: var(--accent);
          }
        `
      ]
    } as SwiperOptions;

    Object.assign(this.swiper.nativeElement, swiperParams);
    this.swiper.nativeElement.initialize();
  }
}
