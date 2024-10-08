import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule,AngularSvgIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @Input() isScrolled: boolean = false;
  showMenu: boolean = false;
  isAnimating = false;

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
}
