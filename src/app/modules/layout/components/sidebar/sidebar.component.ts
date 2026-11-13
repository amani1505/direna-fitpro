import { NgClass } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ThemeService } from '@service/theme.service';
import { MenuService } from '@service/menu.service';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';

@Component({
  selector: 'app-sidebar',
  imports: [NgClass, AngularSvgIconModule, RouterLink, SidebarMenuComponent],
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  constructor(
    public themeService: ThemeService,
    public menuService: MenuService,
  ) {}

  public toggleSidebar() {
    this.menuService.toggleSidebar();
  }

  toggleTheme(event?: MouseEvent) {
    this.themeService.toggle(event);
  }
}
