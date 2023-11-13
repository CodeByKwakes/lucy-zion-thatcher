import { Component, Signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from '@lzt/shared/ui-components';
import { usePageFeature } from '@lzt/pages/data-access';
import { GlobalPage } from '@lzt/shared/models';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'lib-contact',
  standalone: true,
  imports: [CommonModule, BreadcrumbsComponent, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
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
