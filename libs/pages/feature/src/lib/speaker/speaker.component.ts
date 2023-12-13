import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpeakerPage } from '@lzt/shared/models';
import { BasePageComponent } from '../BasePageComponent';
import { BreadcrumbsComponent } from '@lzt/shared/ui-components';
import { GetAssetPipe } from '@lzt/shared/utils';

@Component({
  selector: 'lib-speaker',
  standalone: true,
  imports: [CommonModule, BreadcrumbsComponent, GetAssetPipe],
  templateUrl: './speaker.component.html',
  styleUrls: ['./speaker.component.scss']
})
export class SpeakerComponent extends BasePageComponent<SpeakerPage> {}
