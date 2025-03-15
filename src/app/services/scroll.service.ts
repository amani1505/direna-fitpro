// scroll.service.ts
import { Injectable, Inject, PLATFORM_ID, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private scrollPositionSubject = new BehaviorSubject<number>(0);
  private isScrolledSubject = new BehaviorSubject<boolean>(false);
  private scrollProgressSubject = new BehaviorSubject<number>(0);
  private isBrowser: boolean;

  // Public observables
  scrollPosition$: Observable<number> = this.scrollPositionSubject.asObservable();
  isScrolled$: Observable<boolean> = this.isScrolledSubject.asObservable();
  scrollProgress$: Observable<number> = this.scrollProgressSubject.asObservable();

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private ngZone: NgZone
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      this.initScrollTracking();
    }
  }

  private initScrollTracking(): void {
    // Run outside Angular zone for better performance
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('scroll', () => this.updateScrollInfo(), { passive: true });
      window.addEventListener('resize', () => this.updateScrollInfo(), { passive: true });

      // Initial update
      setTimeout(() => this.updateScrollInfo(), 100);

      // Periodic checking for reliability
      setInterval(() => this.updateScrollInfo(), 1000);
    });

  
  }

  private updateScrollInfo(): void {
    if (!this.isBrowser) return;

    // Get scroll position from multiple sources
    const scrollY = window.scrollY || window.pageYOffset ||
                    document.documentElement.scrollTop ||
                    document.body.scrollTop || 0;

    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const maxScroll = docHeight - winHeight;

    const isScrolled = scrollY > 0;
    const scrollProgress = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;

    // Run inside Angular zone to trigger change detection when publishing values
    this.ngZone.run(() => {
      // Only update if values changed, to reduce change detection cycles
      if (this.scrollPositionSubject.value !== scrollY) {
        this.scrollPositionSubject.next(scrollY);
      }

      if (this.isScrolledSubject.value !== isScrolled) {
        this.isScrolledSubject.next(isScrolled);
      }

      if (Math.abs(this.scrollProgressSubject.value - scrollProgress) > 0.5) {
        this.scrollProgressSubject.next(scrollProgress);
      }
    });
  }

  scrollToTop(): void {
    if (this.isBrowser) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  scrollToPosition(position: number, smooth: boolean = true): void {
    if (this.isBrowser) {
      window.scrollTo({
        top: position,
        behavior: smooth ? 'smooth' : 'auto'
      });
    }
  }
}
