import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutPage } from '@lzt/shared/models';
import { BasePageComponent } from '../BasePageComponent';

@Component({
  selector: 'lib-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent extends BasePageComponent<AboutPage> {}
