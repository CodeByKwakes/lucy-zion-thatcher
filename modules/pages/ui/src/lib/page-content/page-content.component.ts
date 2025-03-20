import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { GetAssetPipe, SafeHtmlPipe } from '@lzt/shared/utils';

@Component({
  selector: 'ui-page-content',
  imports: [CommonModule, GetAssetPipe, SafeHtmlPipe],
  templateUrl: './page-content.component.html',
  styleUrl: './page-content.component.scss'
})
export class PageContentComponent {
  image = input<string | null>();
  text = input<string | null>();
}
