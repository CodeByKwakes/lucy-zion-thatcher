import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpeakerPage } from '@lzt/shared/models';
import { BasePageComponent } from '../BasePageComponent';
import { BreadcrumbsComponent } from '@lzt/shared/ui-components';

@Component({
  selector: 'lib-speaker',
  standalone: true,
  imports: [CommonModule, BreadcrumbsComponent],
  templateUrl: './speaker.component.html',
  styleUrls: ['./speaker.component.scss']
})
export class SpeakerComponent extends BasePageComponent<SpeakerPage> {}
