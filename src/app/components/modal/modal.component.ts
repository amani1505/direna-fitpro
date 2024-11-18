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
