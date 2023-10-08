import { Signal } from '@angular/core';
import { usePageFeature, DIRECTUS_IMAGE_PATH } from '@lzt/pages/data-access';

export abstract class BasePageComponent<T> {
  readonly imagePath = DIRECTUS_IMAGE_PATH;
  readonly $page = usePageFeature().$currentPage as Signal<T>;
}
