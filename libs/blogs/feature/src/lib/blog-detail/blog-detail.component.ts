import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BlogStore } from '@lzt/blogs/data-access';
import { PageHeaderComponent } from '@lzt/shared/ui-components';
import { GetAssetPipe } from '@lzt/shared/utils';

@Component({
  selector: 'lib-blog-detail',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, GetAssetPipe],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent {
  readonly #blogStore = inject(BlogStore);

  readonly blog = this.#blogStore.selectBlogFromRoute;
}
