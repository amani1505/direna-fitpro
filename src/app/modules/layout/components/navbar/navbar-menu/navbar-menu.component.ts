import { NgClass } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MenuItem } from '@model/menu.model';
import { MenuService } from '@service/menu.service';
import { NavbarSubmenuComponent } from '../navbar-submenu/navbar-submenu.component';

@Component({
  selector: 'app-navbar-menu',
  imports: [NgClass, NavbarSubmenuComponent],
  templateUrl: './navbar-menu.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './navbar-menu.component.scss',
})
export class NavbarMenuComponent {
  private _showMenuClass = [
    'scale-100',
    'animate-fade-in-up',
    'opacity-100',
    'pointer-events-auto',
  ];
  private _hideMenuClass = [
    'scale-95',
    'animate-fade-out-down',
    'opacity-0',
    'pointer-events-none',
  ];

  constructor(public menuService: MenuService) {}

  public toggleMenu(menu: MenuItem): void {
    menu.selected = !menu.selected;
  }

  public mouseEnter(event: MouseEvent): void {
    const element = (event.target as HTMLElement).querySelector('app-navbar-submenu')?.children[0];
    if (element) {
      this._hideMenuClass.forEach((c) => element.classList.remove(c));
      this._showMenuClass.forEach((c) => element.classList.add(c));
    }
  }

  public mouseLeave(event: MouseEvent): void {
    const element = (event.target as HTMLElement).querySelector('app-navbar-submenu')?.children[0];
    if (element) {
      this._showMenuClass.forEach((c) => element.classList.remove(c));
      this._hideMenuClass.forEach((c) => element.classList.add(c));
    }
  }
}
