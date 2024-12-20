import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { GetAssetPipe } from '@lzt/shared/utils';

@Component({
  selector: 'lib-page-header',
  imports: [CommonModule, GetAssetPipe],
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {
  headerImage = input<string | null>();
  title = input<string | null>();
}
