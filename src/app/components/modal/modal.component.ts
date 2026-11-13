import { trigger, transition, style, animate } from '@angular/animations';

import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ButtonComponent } from '@components/button/button.component';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'Modal',
  host: { '(document:keydown.escape)': 'onEscape()' },
  imports: [ButtonComponent, AngularSvgIconModule],
  animations: [
    trigger('modalAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(16px) scale(0.92)' }),
        animate(
          '420ms cubic-bezier(0.34, 1.56, 0.64, 1)',
          style({ opacity: 1, transform: 'none' }),
        ), // Animate to normal size
      ]),
      transition(':leave', [
        animate(
          '180ms ease-in',
          style({ opacity: 0, transform: 'translateY(8px) scale(0.96)' }),
        ),
      ]),
    ]),
  ],
  templateUrl: './modal.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() isOpen = false;
  @Input({ required: true }) content = '';
  @Input({ required: true }) title = '';
  @Input({ required: true }) subContent = '';
  @Input() loading = false;
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() confirmed = new EventEmitter<void>();

  closeModal() {
    this.closeModalEvent.emit();
  }

  /** Escape closes the dialog (keyboard alternative to clicking the backdrop). */
  onEscape() {
    if (this.isOpen) this.closeModal();
  }
  save() {
    this.confirmed.emit();
  }
}
