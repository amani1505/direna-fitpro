// splash.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SplashService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  initialize() {
    if (!this.isBrowser) return;

    this.createBackgroundElements();

    // Make sure body is set to not overflow initially
    document.body.style.overflow = 'hidden';

    const checkAngularInterval = setInterval(() => {
      const appRoot = document.querySelector('app-root');
      if (appRoot && appRoot.children.length > 0) {
        clearInterval(checkAngularInterval);
        this.hideSplashScreen();
      }
    }, 100);

    setTimeout(() => {
      clearInterval(checkAngularInterval);
      this.hideSplashScreen();
    }, 8000);
  }

  private createBackgroundElements() {
    const container = document.querySelector('.splash-bg-elements');
    if (!container) return;

    const colors = ['#ff4836', '#2d6f17', '#ff7d66', '#45a825'];
    for (let i = 0; i < 40; i++) {
      const dot = document.createElement('div');
      dot.classList.add('splash-bg-element');
      // Random properties
      const size = Math.random() * 80 + 20;
      dot.style.width = size + 'px';
      dot.style.height = size + 'px';
      dot.style.left = (Math.random() * window.innerWidth) + 'px';
      dot.style.top = (Math.random() * window.innerHeight) + 'px';
      dot.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      dot.style.animationDuration = (Math.random() * 4 + 3) + 's';
      dot.style.animationDelay = (Math.random() * 2) + 's';
      container.appendChild(dot);
    }
  }

  private hideSplashScreen() {
    const splashScreen = document.getElementById('splash-screen');
    if (splashScreen) {
      setTimeout(() => {
        splashScreen.style.opacity = '0';
        setTimeout(() => {
          splashScreen.style.display = 'none';

          // Restore scrolling
          document.body.style.overflow = 'auto';

          // Trigger a scroll event to reinitialize listeners
          setTimeout(() => {
            window.dispatchEvent(new Event('scroll'));
          }, 100);
        }, 500);
      }, 2800);
    }
  }
}
