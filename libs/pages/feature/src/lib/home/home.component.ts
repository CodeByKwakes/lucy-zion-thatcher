import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { usePageFeature } from '@lzt/pages/data-access';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor() {
    usePageFeature().init();
  }
}
