import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-feat-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feat-layout.component.html',
  styleUrls: ['./feat-layout.component.scss'],
})
export class FeatLayoutComponent {
  heroImage = 'assets/imgs/photos/bg-image_16_9.jpg';
}
