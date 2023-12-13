import { Signal } from '@angular/core';
import { usePageFeature } from '@lzt/pages/data-access';

export abstract class BasePageComponent<T> {
  readonly pageStore = usePageFeature();
  readonly $page = this.pageStore.$currentPage as Signal<T>;
}
