import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { GetAssetPipe } from '@lzt/shared/utils';

@Component({
  selector: 'ui-page-content',
  standalone: true,
  imports: [CommonModule, GetAssetPipe],
  templateUrl: './page-content.component.html',
  styleUrl: './page-content.component.scss'
})
export class PageContentComponent {
  image = input<string | null>();
  text = input<string | null>();
}
