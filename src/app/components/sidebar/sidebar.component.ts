import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  animations: [
    // Modal animations
    trigger('sidebarAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10%)' }),
        animate(
          '300ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' }),
        ),
      ]),
      transition(':leave', [
        animate(
          '300ms ease-in',
          style({ opacity: 0, transform: 'translateY(-10%)' }),
        ),
      ]),
    ]),
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Input() isOpened: boolean = false;
  @Input() position: 'left' | 'right' = 'right';
  @Input() title: string = '';
  @Output() closeSidebar = new EventEmitter<void>();

  toggleDrawer() {
    this.isOpened = !this.isOpened;
    if (!this.isOpened) {
      this.closeSidebar.emit();
    }
  }
}
