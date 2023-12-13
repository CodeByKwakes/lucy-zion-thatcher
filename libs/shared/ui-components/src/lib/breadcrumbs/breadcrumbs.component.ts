import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetAssetPipe } from '@lzt/shared/utils';

@Component({
  selector: 'lib-breadcrumbs',
  standalone: true,
  imports: [CommonModule, GetAssetPipe],
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent {
  @Input() headerImage: string | null = null;
  @Input() title: string | null = null;
}
