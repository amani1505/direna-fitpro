import { NgClass } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MenuService } from '@service/menu.service';
import { NavbarMobileMenuComponent } from './navbar-mobile-menu/navbar-mobile-menu.component';

@Component({
  selector: 'app-navbar-mobile',
  imports: [NgClass, AngularSvgIconModule, NavbarMobileMenuComponent],
  templateUrl: './navbar-mobile.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './navbar-mobile.component.scss',
})
export class NavbarMobileComponent {
  constructor(public menuService: MenuService) {}

  public toggleMobileMenu(): void {
    this.menuService.showMobileMenu = false;
  }
}
