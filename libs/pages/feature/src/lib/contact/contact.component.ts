import { Component, Signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from '@lzt/shared/ui-components';
import { usePageFeature } from '@lzt/pages/data-access';
import { ContactPage, GlobalPage } from '@lzt/shared/models';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BasePageComponent } from '../BasePageComponent';

@Component({
  selector: 'lib-contact',
  standalone: true,
  imports: [CommonModule, BreadcrumbsComponent, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent extends BasePageComponent<ContactPage> {
  readonly #pageStore = usePageFeature();
  #formBuilder = inject(FormBuilder);

  readonly $globalPage = this.#pageStore.$getPageBySlug(
    'global'
  ) as Signal<GlobalPage>;

  readonly contactForm = this.#formBuilder.group({
    name: ['', Validators.required],
    email: [''],
    subject: [''],
    message: ['']
  });

  onSubmit() {
    console.log(this.contactForm.value);
  }
}
