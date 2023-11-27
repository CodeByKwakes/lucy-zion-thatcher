import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { useBlogFeature } from '@lzt/blogs/data-access';
import { TruncatePipe } from '@lzt/shared/utils';
import { useCoreStore } from '@lzt/blogs/api-core';
import { BreadcrumbsComponent } from '@lzt/shared/ui-components';
@Component({
  selector: 'lib-blog-list',
  standalone: true,
  imports: [CommonModule, TruncatePipe, BreadcrumbsComponent],
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent {
  readonly #store = useBlogFeature();
  readonly #coreStore = useCoreStore();
  readonly imagePathUrl = this.#store.imagePathUrl;
  readonly $blogList = this.#store.$allBlogs;

  routeToBlogDetail(id: string) {
    this.#coreStore.routeTo(['blogs', id]);
  }
}
