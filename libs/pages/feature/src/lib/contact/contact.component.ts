import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from '@lzt/shared/ui-components';

@Component({
  selector: 'lib-contact',
  standalone: true,
  imports: [CommonModule, BreadcrumbsComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {}
