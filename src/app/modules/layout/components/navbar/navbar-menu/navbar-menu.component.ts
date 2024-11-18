import { NgClass, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from '@model/menu.model';
import { MenuService } from '@service/menu.service';
import { NavbarSubmenuComponent } from '../navbar-submenu/navbar-submenu.component';

@Component({
  selector: 'app-navbar-menu',
  standalone: true,
  imports: [NgFor, NgClass, NavbarSubmenuComponent],
  templateUrl: './navbar-menu.component.html',
  styleUrl: './navbar-menu.component.scss',
})
export class NavbarMenuComponent implements OnInit {
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

  ngOnInit(): void {}

  public toggleMenu(menu: MenuItem): void {
    menu.selected = !menu.selected;
  }

  public mouseEnter(event: any): void {
    let element = event.target.querySelector('app-navbar-submenu').children[0];
    if (element) {
      this._hideMenuClass.forEach((c) => element.classList.remove(c));
      this._showMenuClass.forEach((c) => element.classList.add(c));
    }
  }

  public mouseLeave(event: any): void {
    let element = event.target.querySelector('app-navbar-submenu').children[0];
    if (element) {
      this._showMenuClass.forEach((c) => element.classList.remove(c));
      this._hideMenuClass.forEach((c) => element.classList.add(c));
    }
  }
}
