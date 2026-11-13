import {
  Component,
  OnInit,
  Inject,
  PLATFORM_ID,
  ChangeDetectionStrategy,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { NgClass } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ScrollService } from '@service/scroll.service';

@Component({
  selector: 'app-landing',
  imports: [
    NavbarComponent,
    RouterOutlet,
    FooterComponent,
    NgClass,
    AngularSvgIconModule,
  ],
  templateUrl: './landing.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './landing.component.scss',
})
export class LandingComponent implements OnInit {
  isScrolled = false;
  scrollProgress = 0;
  private isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
    private _scrollService: ScrollService,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      // Subscribe to scroll service
      this._scrollService.isScrolled$.subscribe((scrolled) => {
        this.isScrolled = scrolled;
      });

      this._scrollService.scrollProgress$.subscribe((progress) => {
        this.scrollProgress = progress;
      });
    }
  }

  backToTheTop() {
    this._scrollService.scrollToTop();
  }
}
