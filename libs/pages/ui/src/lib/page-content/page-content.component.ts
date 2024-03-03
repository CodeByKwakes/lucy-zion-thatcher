import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetAssetPipe } from '@lzt/shared/utils';

@Component({
  selector: 'ui-page-content',
  standalone: true,
  imports: [CommonModule, GetAssetPipe],
  templateUrl: './page-content.component.html',
  styleUrl: './page-content.component.scss'
})
export class PageContentComponent {
  @Input() image!: string;
  @Input() text!: string;
}
