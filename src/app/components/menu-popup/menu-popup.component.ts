import { CommonModule } from '@angular/common';
import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClickOutsideDirective } from '@directive/click-outside.directive';
import {
  DropdownConfig,
  DropdownHeader,
  DropdownItem,
  DropdownSection,
} from '@model/dropdown';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'Menu',
  standalone: true,
  imports: [
    CommonModule,
    AngularSvgIconModule,
    RouterModule,
    ClickOutsideDirective,
  ],
  templateUrl: './menu-popup.component.html',
  styleUrl: './menu-popup.component.scss',
})
export class MenuPopupComponent {
  @Input() config: DropdownConfig = {
    triggerType: 'button',
    width: 'w-60',
    position: 'right',
    animation: 'scale',
  };
  @Input() header?: DropdownHeader;
  @Input() sections: DropdownSection[] = [];
  @Input() triggerIcon = '';
  @Input() triggerText = '';
  @Input() containerClass = '';

  @ContentChild('triggerTemplate') triggerTemplate?: TemplateRef<any>;
  @ContentChild('headerTemplate') headerTemplate?: TemplateRef<any>;
  @ContentChild('footerTemplate') footerTemplate?: TemplateRef<any>;

  @Output() itemClick = new EventEmitter<DropdownItem>();

  isMenuOpen = false;

  getTriggerClass(): string {
    const baseClass =
      'flex items-center focus:outline-none focus:ring-2 focus:ring-primary-500';
    switch (this.config.triggerType) {
      case 'avatar':
        return `${baseClass} rounded-full p-0.5 ring-2 ring-primary-500/60 transition hover:ring-primary-500 active:scale-95`;
      case 'icon':
        return `${baseClass} p-2 text-sm font-medium text-ink rounded-full transition hover:bg-surface-2 active:scale-90`;
      case 'button':
        return `${baseClass} rounded-full px-4 py-2 text-sm font-semibold text-ink transition hover:bg-surface-2 active:scale-95`;
      default:
        return baseClass;
    }
  }

  getDropdownClass(): string {
    const position = {
      right: 'right-0',
      left: 'left-0',
      center: 'left-1/2 -translate-x-1/2',
    }[this.config.position || 'right'];

    return `absolute z-30 mt-2 ${this.config.width} max-w-[calc(100vw-2rem)] origin-top-right transform rounded-2xl border border-line bg-surface p-2 shadow-custom transition focus:outline-none ${position}`;
  }

  getAnimationClass(): string {
    const baseShow = 'pointer-events-auto opacity-100 duration-200 z-30 animate-fade-in-up';
    const baseHide = 'pointer-events-none opacity-0 duration-100 ease-in';

    const animations = {
      fade: {
        show: baseShow,
        hide: baseHide,
      },
      scale: {
        show: `${baseShow} scale-100`,
        hide: `${baseHide} scale-95`,
      },
      slide: {
        show: `${baseShow} translate-y-0`,
        hide: `${baseHide} translate-y-2`,
      },
    };

    const animation = animations[this.config.animation || 'scale'];
    return this.isMenuOpen ? animation.show : animation.hide;
  }

  getItemClass(item: DropdownItem): string {
    if (item.hide) {
      return 'hidden'; // This will hide the item completely using CSS
    }

    return `flex items-center rounded-xl px-3 py-2 text-sm font-medium transition
      ${
        item.disabled
          ? 'cursor-not-allowed text-subtle'
          : 'cursor-pointer text-ink hover:translate-x-0.5 hover:bg-surface-2 hover:text-primary-500'
      }`;
  }

  getBadgeClass(color = 'gray'): string {
    const colors = {
      gray: 'bg-gray-100 text-gray-600',
      red: 'bg-red-100 text-red-600',
      green: 'bg-green-100 text-green-600',
      blue: 'bg-blue-100 text-blue-600',
      yellow: 'bg-yellow-100 text-yellow-600',
    };

    return `ml-2 rounded-full px-2 py-0.5 text-xs font-medium ${colors[color as keyof typeof colors]}`;
  }

  toggleMenu(): void {
    event.stopPropagation();
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  handleItemClick(item: DropdownItem): void {
    if (item.disabled) return;

    if (item.action) {
      item.action();
    }

    this.itemClick.emit(item);
    this.closeMenu();
  }
}
