import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutPage } from '@lzt/shared/models';
import { BasePageComponent } from '../BasePageComponent';
import { BreadcrumbsComponent } from '@lzt/shared/ui-components';
import { GetAssetPipe } from '@lzt/shared/utils';
@Component({
  selector: 'lib-about',
  standalone: true,
  imports: [CommonModule, BreadcrumbsComponent, GetAssetPipe],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent extends BasePageComponent<AboutPage> {}
