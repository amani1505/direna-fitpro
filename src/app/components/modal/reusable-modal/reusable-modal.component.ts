import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '@components/button/button.component';
import { ModalConfig } from '@model/modal-config.interface';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'ReusableModal',
  standalone: true,
  imports: [CommonModule, ButtonComponent, AngularSvgIconModule],
  animations: [
    trigger('modalAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' })), // Animate to normal size
      ]),

      transition(':leave', [
        animate(
          '300ms ease-in',
          style({ opacity: 0, transform: 'scale(0.8)' }),
        ),
      ]),
    ]),
  ],
  templateUrl: './reusable-modal.component.html',
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
