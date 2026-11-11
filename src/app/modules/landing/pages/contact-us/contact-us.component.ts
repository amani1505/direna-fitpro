import { NgClass, isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MapComponent } from '@components/map/map.component';
import { RevealDirective } from '@directive/reveal.directive';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CONTACT_INFO } from '../../../../constant/contact';

@Component({
    selector: 'app-contact-us',
    imports: [MapComponent, ReactiveFormsModule, NgClass, RouterLink, AngularSvgIconModule, RevealDirective],
    templateUrl: './contact-us.component.html',
    styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {
  private readonly fb = inject(FormBuilder);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly contact = CONTACT_INFO;
  readonly topics = ['Membership', 'Classes', 'Equipment', 'Something else'];
  readonly maxMessage = 1000;

  readonly form = this.fb.nonNullable.group({
    topic: ['Membership'],
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(this.maxMessage)]],
  });

  /** True once the email app has been opened with the message. */
  readonly sent = signal(false);

  showError(control: 'name' | 'email' | 'message'): boolean {
    const c = this.form.controls[control];
    return c.invalid && c.touched;
  }

  pickTopic(topic: string): void {
    this.form.controls.topic.setValue(topic);
  }

  /**
   * There is no contact endpoint yet, so the message is handed to the
   * visitor's email app, addressed to the main contact email.
   */
  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { topic, name, email, message } = this.form.getRawValue();
    const to = this.contact.emails[0]?.label ?? '';
    const subject = `${topic} enquiry from ${name}`;
    const body = `${message}\n\n${name}\n${email}`;
    if (this.isBrowser) {
      window.location.href =
        `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
    this.sent.set(true);
  }

  reset(): void {
    this.form.reset({ topic: 'Membership', name: '', email: '', message: '' });
    this.sent.set(false);
  }
}
