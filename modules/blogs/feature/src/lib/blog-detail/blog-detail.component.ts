import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BlogStore } from '@lzt/blogs/domain';
import { PageHeaderComponent } from '@lzt/shared/ui';
import { GetAssetPipe, SafeHtmlPipe } from '@lzt/shared/utils';

@Component({
  selector: 'lib-blog-detail',
  imports: [CommonModule, PageHeaderComponent, GetAssetPipe, SafeHtmlPipe],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent {
  readonly #blogStore = inject(BlogStore);

  readonly blog = this.#blogStore.selectBlogFromRoute;
}
