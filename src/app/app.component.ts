import { isPlatformBrowser, NgClass } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from '@service/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public themeService: ThemeService,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const leafletCss = document.createElement('link');
      leafletCss.rel = 'stylesheet';
      leafletCss.href = 'leaflet-css.css';
      document.head.appendChild(leafletCss);
    }
  }
}
