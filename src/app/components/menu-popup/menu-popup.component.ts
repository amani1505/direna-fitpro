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
        return `${baseClass} rounded-full bg-gray-800 text-sm`;
      case 'icon':
        return `${baseClass} lg:text-[var(--onyx)] lg:p-[5px] p-2 text-sm font-medium text-gray-700 rounded-full hover:bg-gray-100 dark:text-night-200 dark:hover:bg-night-500`;
      case 'button':
        return `${baseClass} rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-night-200 dark:hover:bg-night-500`;
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

    return `absolute mt-2 ${this.config.width} origin-top-right transform rounded-md bg-white py-4 shadow ring-1 ring-transparent ring-opacity-5 transition focus:outline-none dark:bg-night-600 ${position}`;
  }

  getAnimationClass(): string {
    const baseShow = 'pointer-events-auto opacity-100 duration-200 z-10';
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
    return `flex items-center rounded-md px-3 py-2 text-sm
      ${
        item.disabled
          ? 'cursor-not-allowed text-gray-400 dark:text-night-400'
          : 'cursor-pointer text-gray-700 hover:bg-gray-100 hover:text-primary-500 dark:text-night-200 dark:hover:bg-night-500 dark:hover:text-primary-500'
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
