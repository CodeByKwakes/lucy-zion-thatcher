import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpeakerPage } from '@lzt/pages/models';
import { BasePageComponent } from '../BasePageComponent';

@Component({
  selector: 'lib-speaker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './speaker.component.html',
  styleUrls: ['./speaker.component.scss']
})
export class SpeakerComponent extends BasePageComponent<SpeakerPage> {}
