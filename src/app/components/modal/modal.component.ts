import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '@components/button/button.component';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'Modal',
  standalone: true,
  imports: [CommonModule, ButtonComponent,AngularSvgIconModule],
  animations: [
    trigger('modalAnimation', [
         transition(':enter', [
        style({ opacity: 0, transform: 'translateY(16px) scale(0.92)' }),
        animate('420ms cubic-bezier(0.34, 1.56, 0.64, 1)', style({ opacity: 1, transform: 'none' })), // Animate to normal size
      ]),

      transition(':leave', [
        animate('180ms ease-in', style({ opacity: 0, transform: 'translateY(8px) scale(0.96)' })), 
      ]),
    ]),
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() isOpen: boolean = false;
  @Input({ required: true }) content: string = '';
  @Input({ required: true }) title: string = '';
  @Input({required:true}) subContent:string=''
  @Input() loading: boolean = false;
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() submit = new EventEmitter<void>();

  closeModal() {
    this.closeModalEvent.emit();
  }
  save() {
    this.submit.emit();
  }
}
