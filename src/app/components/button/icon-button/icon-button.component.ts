import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'IconButton',
  standalone: true,
  imports: [CommonModule, MatRippleModule, AngularSvgIconModule],
  templateUrl: './icon-button.component.html',
  styleUrl: './icon-button.component.scss',
})
export class IconButtonComponent {
  @Input() size: 'medium' | 'small' | 'large' = 'medium';
  @Input() color:
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'warning'
    | 'info'
    | 'normal' = 'normal';
  @Input() variant: 'filled' | 'basic' = 'basic';
  @Input({ required: true }) icon: string =
    'assets/icons/heroicons/outline/x.svg';
  @Input() rounded: boolean = false;
  @Output() onClick = new EventEmitter<void>();

  get sizeClasses() {
    switch (this.size) {
      case 'small':
        return 'p-3 text-sm';
      case 'large':
        return 'p-5 text-lg';
      default:
        return 'p-4  text-md';
    }
  }
  get iconSize(){
    switch (this.size) {
      case 'small':
        return 'h-5 w-5';
      case 'large':
        return 'h-7 w-7';
      default:
        return 'h-6 w-6';
    }

  }
  get colorClasses() {
    const baseClass =
      this.variant === 'basic' ? 'bg-transparent' : '';

    switch (this.color) {
      case 'primary':
        return `${baseClass} ${this.variant !== 'basic' ? 'bg-primary-500 hover:bg-primary-600' : 'text-primary-500 hover:bg-primary-500/15'}`;
      case 'secondary':
        return `${baseClass} border-secondary-600 ${this.variant !== 'basic' ? 'bg-secondary-500 hover:bg-secondary-600' : 'text-secondary-500 hover:bg-secondary-500/15'}`;
      case 'danger':
        return `${baseClass} ${this.variant !== 'basic' ? 'bg-red-500 hover:bg-red-600' : 'text-red-500 hover:bg-red-500/15'}`;
      case 'warning':
        return `${baseClass} ${this.variant !== 'basic' ? 'bg-yellow-500 hover:bg-yellow-600' : 'text-yellow-500 hover:bg-yellow-500/15'}`;
      case 'info':
        return `${baseClass}  ${this.variant !== 'basic' ? 'bg-teal-500 hover:bg-teal-600' : 'text-teal-500 hover:bg-teal-500/15'}`;
      case 'normal':
        return `${baseClass} text-muted ${this.variant !== 'basic' ? 'bg-surface-2 hover:bg-line' : 'hover:bg-surface-2'}`;
      default:
        return `${baseClass} border-blue-500 ${this.variant !== 'basic' ? 'bg-blue-100 hover:bg-blue-200' : 'text-blue-500 hover:bg-blue-200'}`;
    }
  }

  click() {
    this.onClick.emit();
  }
}
