import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { useBlogFeature } from '@lzt/blogs/data-access';
import { BreadcrumbsComponent } from '@lzt/shared/ui-components';
import { GetAssetPipe } from '@lzt/shared/utils';

@Component({
  selector: 'lib-blog-detail',
  standalone: true,
  imports: [CommonModule, BreadcrumbsComponent, GetAssetPipe],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent {
  readonly blogStore = useBlogFeature();
  readonly $blog = this.blogStore.$currentBlog;
  // readonly blog = inject(BlogStore).selectBlogFromRoute();
}
