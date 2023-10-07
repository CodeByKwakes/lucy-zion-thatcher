import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { usePageFeature } from '@lzt/pages/data-access';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feat-home.component.html',
  styleUrls: ['./feat-home.component.scss']
})
export class FeatHomeComponent {
  constructor() {
    usePageFeature().init();
  }
}
