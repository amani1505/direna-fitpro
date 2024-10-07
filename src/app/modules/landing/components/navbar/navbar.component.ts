import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @Input() isScrolled: boolean = false;
  showMenu: boolean = false;

  openMobileNav() {
    this.showMenu = true;
  }
  closeMobileNav() {
    this.showMenu = false;
  }
}
