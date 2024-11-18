import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'Button',
  standalone: true,
  imports: [CommonModule, MatRippleModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() size: 'medium' | 'small' | 'large' = 'medium';
  @Input() color:
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'warning'
    | 'info'
    | 'normal' = 'normal';
  @Input() variant: 'filled' | 'outlined' = 'filled';
  @Input() rounded: boolean = false;
  @Output() onClick = new EventEmitter<void>();

  get sizeClasses() {
    switch (this.size) {
      case 'small':
        return 'px-3 py-1 text-sm';
      case 'large':
        return 'px-6 py-3 text-lg';
      default:
        return 'px-4 py-2 text-md';
    }
  }
  get colorClasses() {
    const baseClass =
      this.variant === 'outlined' ? 'border bg-transparent' : 'text-white';

    switch (this.color) {
      case 'primary':
        return `${baseClass} border-primary-600 ${this.variant !== 'outlined' ? 'bg-primary-500 hover:bg-primary-600' : 'text-primary-700 hover:bg-primary-600'}`;
      case 'secondary':
        return `${baseClass} border-secondary-600 ${this.variant !== 'outlined' ? 'bg-secondary-500 hover:bg-secondary-600' : 'text-secondary-700 hover:bg-secondary-600'}`;
      case 'danger':
        return `${baseClass} border-red-600 ${this.variant !== 'outlined' ? 'bg-red-500 hover:bg-red-600' : 'text-red-700 hover:bg-red-600'}`;
      case 'warning':
        return `${baseClass} border-yellow-600 ${this.variant !== 'outlined' ? 'bg-yellow-500 hover:bg-yellow-600' : 'text-yellow-700 hover:bg-yellow-600'}`;
      case 'info':
        return `${baseClass} border-teal-600 ${this.variant !== 'outlined' ? 'bg-teal-500 hover:bg-teal-600' : 'text-teal-700 hover:bg-teal-600'}`;
      case 'normal':
        return `${baseClass} border-gray-500 dark:text-night-200 dark:hover:bg-night-500 ${this.variant !== 'outlined' ? 'bg-gray-100 hover:bg-gray-200' : 'text-gray-500 hover:bg-gray-200'}`;
      default:
        return `${baseClass} border-blue-500 ${this.variant !== 'outlined' ? 'bg-blue-100 hover:bg-blue-200' : 'text-blue-700 hover:bg-blue-200'}`;
    }
  }

  click() {
    this.onClick.emit();
  }
}
