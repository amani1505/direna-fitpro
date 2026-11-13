import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  Inject,
  PLATFORM_ID,
  ChangeDetectionStrategy,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SplashService } from '@service/splash-screen.service';
import { ThemeService } from '@service/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public themeService: ThemeService,
    private _splashService: SplashService,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const leafletCss = document.createElement('link');
      leafletCss.rel = 'stylesheet';
      leafletCss.href = 'leaflet-css.css';
      document.head.appendChild(leafletCss);
    }
  }

  ngOnInit() {
    this._splashService.initialize();
  }
}
