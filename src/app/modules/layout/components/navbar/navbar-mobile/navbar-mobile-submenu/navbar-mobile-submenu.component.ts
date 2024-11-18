import { NgClass, NgFor, NgTemplateOutlet } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { SubMenuItem } from '@model/menu.model';
import { MenuService } from '@service/menu.service';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-navbar-mobile-submenu',
  standalone: true,
  imports: [
    NgClass,
    NgFor,
    NgTemplateOutlet,
    RouterLinkActive,
    RouterLink,
    AngularSvgIconModule,
  ],
  templateUrl: './navbar-mobile-submenu.component.html',
  styleUrl: './navbar-mobile-submenu.component.scss',
})
export class NavbarMobileSubmenuComponent implements OnInit {
  @Input() public submenu = <SubMenuItem>{};

  constructor(private _menuService: MenuService) {}

  ngOnInit(): void {}

  public toggleMenu(menu: any) {
    this._menuService.toggleSubMenu(menu);
  }

  private collapse(items: Array<any>) {
    items.forEach((item) => {
      item.expanded = false;
      if (item.children) this.collapse(item.children);
    });
  }

  public closeMobileMenu() {
    this._menuService.showMobileMenu = false;
  }
}
