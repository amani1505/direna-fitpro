import { Component, HostListener } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { NgIf } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, FooterComponent, NgIf,AngularSvgIconModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {
  isScrolled: boolean = false;
  scrollProgress = 0;

  @HostListener('window:scroll')
  onscroll(): void {
    const scrollY = window.scrollY;
    if (scrollY > 0) {
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
    }
    this.scrollProgress =
      (scrollY / (document.documentElement.scrollHeight - window.innerHeight)) *
      100;
  }

  backToTheTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
