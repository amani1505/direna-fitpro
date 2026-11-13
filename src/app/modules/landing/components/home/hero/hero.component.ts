import { NgClass, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';

interface HeroInterface {
  id: string;
  image: string;
  title: string;
  subtitle: string;
}

interface HeroTile {
  label: string;
  hint: string;
  icon: string;
  route: string;
  fragment?: string;
  tone: string;
}

@Component({
  selector: 'hero',
  imports: [RouterModule, NgClass, AngularSvgIconModule],
  templateUrl: './hero.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('heroEl') heroEl?: ElementRef<HTMLElement>;

  private readonly zone = inject(NgZone);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private frame = 0;

  hero: HeroInterface = {
    id: '1',
    image: './assets/images/hero-banner.png',
    title: 'Work Hard To Get Better Life',
    subtitle:
      'Achieve your health goals with modern equipment and tailored workout programs',
  };

  /** Headline split into words so each one can rise in on its own. */
  get titleWords(): string[] {
    return this.hero.title.split(/\s+/).filter(Boolean);
  }

  readonly tiles: HeroTile[] = [
    {
      label: 'Classes',
      hint: 'Find your session',
      icon: 'assets/icons/heroicons/outline/fire.svg',
      route: '/',
      fragment: 'class',
      tone: 'bg-primary-500/20 text-primary-300',
    },
    {
      label: 'Equipment',
      hint: 'Shop the gear',
      icon: 'assets/icons/heroicons/outline/shopping-cart.svg',
      route: '/equipments',
      tone: 'bg-secondary-400/20 text-secondary-200',
    },
    {
      label: 'Blog',
      hint: 'Tips & stories',
      icon: 'assets/icons/heroicons/outline/clipboard-document-list.svg',
      route: '/blogs',
      tone: 'bg-yellow-300/15 text-yellow-200',
    },
  ];

  /** Bar heights (%) for the calories mini chart. */
  readonly bars = [40, 65, 50, 80, 60, 95, 70];

  readonly ticker = [
    'Weight lifting',
    'Cardio & strength',
    'Yoga & pilates',
    'Mind & body',
  ];

  /** Repeated so one track is always wider than the screen (no gap in the loop). */
  readonly tickerLoop = [...this.ticker, ...this.ticker, ...this.ticker];

  /** Pointer position (-0.5..0.5) drives the parallax layers via CSS vars. */
  private readonly onMove = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse') return;
    const el = this.heroEl?.nativeElement;
    if (!el) return;
    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      el.style.setProperty(
        '--px',
        ((event.clientX - r.left) / r.width - 0.5).toFixed(3),
      );
      el.style.setProperty(
        '--py',
        ((event.clientY - r.top) / r.height - 0.5).toFixed(3),
      );
    });
  };

  private readonly onLeave = () => {
    const el = this.heroEl?.nativeElement;
    el?.style.setProperty('--px', '0');
    el?.style.setProperty('--py', '0');
  };

  ngAfterViewInit(): void {
    const el = this.heroEl?.nativeElement;
    if (!this.isBrowser || !el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    this.zone.runOutsideAngular(() => {
      el.addEventListener('pointermove', this.onMove, { passive: true });
      el.addEventListener('pointerleave', this.onLeave);
    });
  }

  ngOnDestroy(): void {
    if (!this.isBrowser) return;
    const el = this.heroEl?.nativeElement;
    cancelAnimationFrame(this.frame);
    el?.removeEventListener('pointermove', this.onMove);
    el?.removeEventListener('pointerleave', this.onLeave);
  }
}
