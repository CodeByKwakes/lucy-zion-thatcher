import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { selectUrl } from '@lzt/core/data-access';
import { Store } from '@ngrx/store';

@Component({
  selector: 'lib-feat-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feat-layout.component.html',
  styleUrls: ['./feat-layout.component.scss']
})
export class FeatLayoutComponent {
  heroImage = 'assets/imgs/photos/bg-image_16_9.jpg';

  constructor() {
    inject(Store)
      .select(selectUrl)
      .subscribe((url) => console.log(url.slice(1)));
  }
}
