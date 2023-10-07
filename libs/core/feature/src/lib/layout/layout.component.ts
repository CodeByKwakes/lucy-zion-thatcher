import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { selectUrl } from '@lzt/core/data-access';
import { Store } from '@ngrx/store';

@Component({
  selector: 'lib-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  heroImage = 'assets/imgs/photos/bg-image_16_9.jpg';

  constructor() {
    inject(Store)
      .select(selectUrl)
      .subscribe((url) => console.log(url.slice(1)));
  }
}
