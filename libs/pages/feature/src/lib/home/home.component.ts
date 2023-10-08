import { Component, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { usePageFeature } from '@lzt/pages/data-access';
import { HomePage } from '@lzt/pages/models';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  $page = usePageFeature().currentPage$ as Signal<HomePage>;
  constructor() {
    usePageFeature().init();
  }
}
