import { CommonModule } from '@angular/common';
import { Component, Signal, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PageStore } from '@lzt/pages/domain';
import { DataService } from '@lzt/shared/data-access';
import { ContactPage, GlobalPage, MessageMeta } from '@lzt/shared/models';
import { PageHeaderComponent } from '@lzt/shared/ui-components';

@Component({
  selector: 'lib-contact',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  readonly #dataService = inject(DataService);
  readonly #formBuilder = inject(FormBuilder);
  readonly #pageStore = inject(PageStore);

  readonly contactForm = this.#formBuilder.group({
    name: ['', Validators.required],
    email: [''],
    subject: [''],
    message: ['']
  });
  readonly currentPage = this.#pageStore
    .selectCurrentPage as Signal<ContactPage>;
  readonly globalPage = this.#pageStore.selectGlobalPage as Signal<GlobalPage>;

  readonly errorMessage = signal<string | null>(null);
  readonly isLoading = signal(false);
  readonly successMessage = signal<string | null>(null);

  onSubmit() {
    console.log(this.contactForm.value);
    this.isLoading.set(true);
    this.#dataService.sendMessage(this.contactForm.value as MessageMeta).then(
      () => {
        this.isLoading.set(false);
        this.successMessage.set('Your message has been sent. Thank you!');
        this.contactForm.reset();

        setTimeout(() => {
          this.successMessage.set(null);
        }, 5000);
      },
      (error) => {
        this.isLoading.set(false);
        this.errorMessage.set(error.message);
      }
    );
  }
}
