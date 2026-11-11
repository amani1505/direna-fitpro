import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  PLATFORM_ID,
  inject,
} from '@angular/core';

export type RevealDirection = '' | 'up' | 'left' | 'right' | 'zoom';

/**
 * Animates an element in the first time it scrolls into view.
 *
 *   <div reveal></div>                       fade + rise
 *   <div reveal="zoom" [revealDelay]="120">  zoom in after 120ms
 *
 * Server-rendered and reduced-motion users see the content immediately.
 */
@Directive({
  selector: '[reveal]',
  standalone: true,
})
export class RevealDirective implements AfterViewInit, OnDestroy {
  @Input() reveal: RevealDirection = '';
  @Input() revealDelay = 0;

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly zone = inject(NgZone);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    if (!this.isBrowser || !('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const node: HTMLElement = this.el.nativeElement;
    node.classList.add('reveal', `reveal-${this.reveal || 'up'}`);
    node.style.setProperty('--reveal-delay', `${this.revealDelay}ms`);

    this.zone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              node.classList.add('is-visible');
              this.observer?.disconnect();
            }
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
      );
      this.observer.observe(node);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
