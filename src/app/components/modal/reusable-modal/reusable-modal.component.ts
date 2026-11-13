import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ButtonComponent } from '@components/button/button.component';
import { ModalConfig } from '@model/modal-config.interface';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'ReusableModal',
  imports: [CommonModule, ButtonComponent, AngularSvgIconModule],
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
  templateUrl: './reusable-modal.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './reusable-modal.component.scss',
})
export class ReusableModalComponent {
  @Input() isOpen: boolean = false;
  @Input() loading: boolean = false;
  @Input() config: ModalConfig = {
    title: '',
    showHeader: true,
    showFooter: true,
    closeOnOverlayClick: true,
    size: 'md',
  };

  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() submit = new EventEmitter<void>();

  getSizeClass(): string {
    const sizeClasses = {
      sm: 'max-w-sm',
      md: 'max-w-lg',
      lg: 'max-w-2xl',
      xl: 'max-w-4xl',
    };
    return sizeClasses[this.config.size || 'md'];
  }

  closeModal(): void {
    this.closeModalEvent.emit();
  }

  save(): void {
    this.submit.emit();
  }
}
