import { isPlatformBrowser } from '@angular/common';
import {
  ApplicationRef,
  Injectable,
  PLATFORM_ID,
  computed,
  inject,
  signal,
  DOCUMENT
} from '@angular/core';

export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'theme';

/**
 * Owns light/dark mode for the whole app.
 *
 * The `.dark` class lives on <html> (an inline script in index.html sets it
 * before first paint). If the user never picked a theme we follow the OS
 * setting, including live changes to it.
 */
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly doc = inject(DOCUMENT);
  private readonly appRef = inject(ApplicationRef);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  public readonly default: ThemeMode = 'light';
  public readonly mode = signal<ThemeMode>(this.readInitial());
  public readonly dark = computed(() => this.mode() === 'dark');

  /** Kept for backwards compatibility with existing callers. */
  public readonly themeChanged = this.mode;

  constructor() {
    if (!this.isBrowser) return;
    this.applyClass(this.mode());

    const media = window.matchMedia?.('(prefers-color-scheme: dark)');
    media?.addEventListener?.('change', (e) => {
      if (!this.storedPreference()) {
        this.set(e.matches ? 'dark' : 'light', false);
      }
    });
  }

  public get theme(): ThemeMode {
    return this.mode();
  }

  public set theme(value: string) {
    this.set(value === 'dark' ? 'dark' : 'light');
  }

  public get isDark(): boolean {
    return this.mode() === 'dark';
  }

  /**
   * Switch theme. When an event/point is given and the browser supports the
   * View Transitions API, the new theme grows out of that point as a circle.
   */
  public toggle(origin?: MouseEvent | { x: number; y: number }): void {
    const next: ThemeMode = this.isDark ? 'light' : 'dark';

    const doc = this.doc as Document & {
      startViewTransition?: (cb: () => void) => { finished: Promise<void> };
    };
    const reduceMotion =
      this.isBrowser &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (!this.isBrowser || reduceMotion || !doc.startViewTransition) {
      this.set(next);
      return;
    }

    const point = this.originPoint(origin);
    const root = doc.documentElement;
    const radius = Math.hypot(
      Math.max(point.x, window.innerWidth - point.x),
      Math.max(point.y, window.innerHeight - point.y),
    );
    root.style.setProperty('--vt-x', `${point.x}px`);
    root.style.setProperty('--vt-y', `${point.y}px`);
    root.style.setProperty('--vt-r', `${radius}px`);
    root.classList.add('theme-vt');

    const transition = doc.startViewTransition(() => {
      this.set(next);
      // Render the new icon state before the "after" snapshot is taken.
      try {
        this.appRef.tick();
      } catch {
        /* a tick is already running; the next one will pick it up */
      }
    });
    transition.finished.finally(() => root.classList.remove('theme-vt'));
  }

  private set(value: ThemeMode, persist = true): void {
    this.mode.set(value);
    if (!this.isBrowser) return;
    if (persist) {
      try {
        localStorage.setItem(STORAGE_KEY, value);
      } catch {
        /* storage unavailable (private mode) */
      }
    }
    this.applyClass(value);
  }

  private applyClass(value: ThemeMode): void {
    const root = this.doc.documentElement;
    root.classList.toggle('dark', value === 'dark');
    root.style.colorScheme = value;
  }

  private readInitial(): ThemeMode {
    if (!this.isBrowser) return this.default;
    const stored = this.storedPreference();
    if (stored) return stored;
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  private storedPreference(): ThemeMode | null {
    try {
      const value = localStorage.getItem(STORAGE_KEY);
      return value === 'dark' || value === 'light' ? value : null;
    } catch {
      return null;
    }
  }

  private originPoint(origin?: MouseEvent | { x: number; y: number }) {
    if (origin instanceof MouseEvent) {
      const target = origin.currentTarget as HTMLElement | null;
      if (target?.getBoundingClientRect && origin.detail === 0) {
        // Keyboard activation: use the centre of the button.
        const r = target.getBoundingClientRect();
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      }
      return { x: origin.clientX, y: origin.clientY };
    }
    return origin ?? { x: window.innerWidth / 2, y: 0 };
  }
}
