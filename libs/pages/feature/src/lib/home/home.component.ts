import { Component, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { usePageFeature } from '@lzt/pages/data-access';
import { HomePage } from '@lzt/shared/models';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  readonly $page = usePageFeature().$currentPage as Signal<HomePage>;
}
