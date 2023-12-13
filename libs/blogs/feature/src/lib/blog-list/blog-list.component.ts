import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { useCoreStore } from '@lzt/blogs/api-core';
import { useBlogFeature } from '@lzt/blogs/data-access';
import { BreadcrumbsComponent } from '@lzt/shared/ui-components';
import { GetAssetPipe, TruncatePipe } from '@lzt/shared/utils';

@Component({
  selector: 'lib-blog-list',
  standalone: true,
  imports: [CommonModule, TruncatePipe, BreadcrumbsComponent, GetAssetPipe],
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent {
  readonly #store = useBlogFeature();
  readonly #coreStore = useCoreStore();
  readonly $blogList = this.#store.$allBlogs;

  routeToBlogDetail(id: string) {
    this.#coreStore.routeTo(['blogs', id]);
  }
}
