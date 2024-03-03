import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetAssetPipe } from '@lzt/shared/utils';

@Component({
  selector: 'lib-page-header',
  standalone: true,
  imports: [CommonModule, GetAssetPipe],
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {
  @Input() headerImage: string | null = null;
  @Input() title: string | null = null;
}
