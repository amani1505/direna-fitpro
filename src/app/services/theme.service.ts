import { Injectable, Inject, PLATFORM_ID,signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public default = 'light';
  public themeChanged = signal(this.theme);

 constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  public get theme(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('theme') ?? this.default;
    }
    return this.default;
  }

  public set theme(value: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', value);
      this.themeChanged.set(value);
    }
  }

  public get isDark(): boolean {
    return this.theme == 'dark';
  }

}
