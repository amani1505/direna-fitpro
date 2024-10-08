import { CommonModule } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, AngularSvgIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @Input() isScrolled: boolean = false;
  showMenu: boolean = false;
  isAnimating = false;

  constructor(private _router: Router) {}

  openMobileNav() {
    this.showMenu = true;
    this.isAnimating = true;
    document.body.classList.add('overflow-hidden');
  }
  closeMobileNav() {
    this.showMenu = false;
    this.isAnimating = true;
  }

  handleAnimationEnd() {
    if (!this.showMenu) {
      this.isAnimating = false;

      document.body.classList.remove('overflow-hidden');
    }
  }
  navigate(route: string) {
    this._router.navigate([route]);
    this.showMenu = false;
    this.isAnimating = true;
  }
  isActiveRoute(route: string): boolean {
    return this._router.url === route;
  }

  // Method for partial match of routes
  isPartialActiveRoute(route: string): boolean {
    return this._router.isActive(route, false); 

  }
}
