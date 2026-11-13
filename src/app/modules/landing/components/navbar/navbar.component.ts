import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  inject,
  DOCUMENT,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ThemeToggleComponent } from '@components/theme-toggle/theme-toggle.component';
import { AngularSvgIconModule } from 'angular-svg-icon';

interface NavLink {
  label: string;
  route: string;
  fragment?: string;
}

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule,
    RouterModule,
    AngularSvgIconModule,
    ThemeToggleComponent,
  ],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @Input() isScrolled: boolean = false;
  showMenu: boolean = false;
  isAnimating = false;

  private readonly doc = inject(DOCUMENT);

  readonly links: NavLink[] = [
    { label: 'Home', route: '/' },
    { label: 'Classes', route: '/', fragment: 'class' },
    { label: 'Blogs', route: '/blogs' },
    { label: 'Equipment', route: '/equipments' },
    { label: 'About us', route: '/about' },
    { label: 'Contact', route: '/contact-us' },
  ];

  readonly socials = [
    { label: 'Facebook', icon: './assets/icons/ionicons/logo-facebook.svg' },
    { label: 'Twitter', icon: './assets/icons/ionicons/logo-twitter.svg' },
    { label: 'Instagram', icon: 'assets/icons/logo-instagram.svg' },
    { label: 'LinkedIn', icon: 'assets/icons/logo-linkedin.svg' },
  ];

  constructor(private _router: Router) {}

  openMobileNav() {
    this.showMenu = true;
    this.isAnimating = true;
    this.doc.body.classList.add('overflow-hidden');
  }

  closeMobileNav() {
    this.showMenu = false;
    this.isAnimating = true;
  }

  handleAnimationEnd(event?: AnimationEvent) {
    // Ignore animations bubbling up from the staggered links.
    if (event && event.target !== event.currentTarget) return;
    if (!this.showMenu) {
      this.isAnimating = false;
      this.doc.body.classList.remove('overflow-hidden');
    }
  }

  navigate(route: string) {
    this._router.navigate([route]);
    this.closeMobileNav();
  }

  goToFragment(fragment: string) {
    this._router.navigate(['/'], { fragment });
    this.closeMobileNav();
  }

  isActiveRoute(route: string): boolean {
    const url = this._router.url.split('#')[0].split('?')[0];
    return route === '/'
      ? url === '/'
      : url.startsWith(route.startsWith('/') ? route : '/' + route);
  }

  // Method for partial match of routes
  isPartialActiveRoute(route: string): boolean {
    return this._router.isActive(route, false);
  }
}
