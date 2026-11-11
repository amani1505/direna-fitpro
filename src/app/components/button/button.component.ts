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
        return 'px-3 py-1.5 text-sm';
      case 'large':
        return 'px-6 py-3 text-lg';
      default:
        return 'px-4 py-2.5 text-[15px]';
    }
  }

  get colorClasses() {
    const outlined = this.variant === 'outlined';
    const base = outlined ? 'border-2 bg-transparent' : 'border-2 border-transparent text-white';

    switch (this.color) {
      case 'primary':
        return outlined
          ? `${base} border-primary-500 text-primary-600 hover:bg-primary-500 hover:text-white dark:text-primary-400`
          : `${base} bg-primary-500 hover:bg-primary-600 hover:shadow-glow`;
      case 'secondary':
        return outlined
          ? `${base} border-secondary-500 text-secondary-600 hover:bg-secondary-500 hover:text-white dark:text-secondary-300`
          : `${base} bg-secondary-500 hover:bg-secondary-600`;
      case 'danger':
        return outlined
          ? `${base} border-red-500 text-red-600 hover:bg-red-500 hover:text-white dark:text-red-400`
          : `${base} bg-red-500 hover:bg-red-600`;
      case 'warning':
        return outlined
          ? `${base} border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-white dark:text-yellow-400`
          : `${base} bg-yellow-500 hover:bg-yellow-600`;
      case 'info':
        return outlined
          ? `${base} border-teal-500 text-teal-600 hover:bg-teal-500 hover:text-white dark:text-teal-400`
          : `${base} bg-teal-500 hover:bg-teal-600`;
      case 'normal':
        return outlined
          ? `${base} border-line text-ink hover:bg-surface-2`
          : 'border-2 border-transparent bg-surface-2 text-ink hover:bg-line';
      default:
        return `${base} border-blue-500 ${outlined ? 'text-blue-600 hover:bg-blue-500 hover:text-white' : 'bg-blue-500 hover:bg-blue-600'}`;
    }
  }

  click() {
    this.onClick.emit();
  }
}
