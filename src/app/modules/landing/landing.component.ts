import { Component, HostListener, OnInit, OnDestroy, Inject, PLATFORM_ID, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { NgIf } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { BreadCrumbsComponent } from '@components/bread-crumbs/bread-crumbs.component';
import { ScrollService } from '@service/scroll.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, FooterComponent, NgIf, AngularSvgIconModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent implements OnInit {
  isScrolled: boolean = false;
  scrollProgress = 0;
  private isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private _scrollService: ScrollService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      // Subscribe to scroll service
      this._scrollService.isScrolled$.subscribe(scrolled => {
        this.isScrolled = scrolled;
        
      });

      this._scrollService.scrollProgress$.subscribe(progress => {
        this.scrollProgress = progress;
      });
    }
  }

  backToTheTop() {
    this._scrollService.scrollToTop();
  }
}
