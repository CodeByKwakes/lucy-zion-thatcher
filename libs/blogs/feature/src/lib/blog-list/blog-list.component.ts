import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BlogStore } from '@lzt/blogs/data-access';
import { useCoreStore } from '@lzt/core/api';
import { PageHeaderComponent } from '@lzt/shared/ui-components';
import { GetAssetPipe, TruncatePipe, SafeHtmlPipe } from '@lzt/shared/utils';

@Component({
  selector: 'lib-blog-list',
  standalone: true,
  imports: [
    CommonModule,
    TruncatePipe,
    PageHeaderComponent,
    GetAssetPipe,
    SafeHtmlPipe
  ],
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent {
  readonly #coreStore = useCoreStore();
  readonly blog = inject(BlogStore);

  routeToBlogDetail(slug: string) {
    this.#coreStore.routeTo(['blogs', slug]);
  }
}
