import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { useBlogFeature } from '@lzt/blogs/data-access';
import { BreadcrumbsComponent } from '@lzt/shared/ui-components';
@Component({
  selector: 'lib-blog-detail',
  standalone: true,
  imports: [CommonModule, BreadcrumbsComponent],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent {
  readonly blogStore = useBlogFeature();
  readonly imagePath = this.blogStore.imagePathUrl;
  readonly $blog = this.blogStore.$currentBlog;
}
