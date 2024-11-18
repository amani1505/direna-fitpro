import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'Menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-popup.component.html',
  styleUrl: './menu-popup.component.scss',
})
export class MenuPopupComponent {
  @Input() isMenuOpen: boolean = false;
  @Output() onClick = new EventEmitter<void>();

  
  click() {
    this.isMenuOpen = !this.isMenuOpen;
    this.onClick.emit();
  }
}
