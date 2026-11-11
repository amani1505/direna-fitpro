import { isPlatformBrowser } from '@angular/common';
import {
  Directive,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  inject,
} from '@angular/core';

/**
 * Adds a soft coral glow that follows the pointer across a card.
 * Pairs with the `.spotlight` styles in styles.scss. Touch devices skip it.
 */
@Directive({
  selector: '[spotlight]',
  standalone: true,
  host: { class: 'spotlight' },
})
export class SpotlightDirective implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly zone = inject(NgZone);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private frame = 0;

  private readonly onMove = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse') return;
    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(() => {
      const node: HTMLElement = this.el.nativeElement;
      const rect = node.getBoundingClientRect();
      node.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      node.style.setProperty('--my', `${event.clientY - rect.top}px`);
    });
  };

  ngOnInit(): void {
    if (!this.isBrowser) return;
    this.zone.runOutsideAngular(() =>
      this.el.nativeElement.addEventListener('pointermove', this.onMove, {
        passive: true,
      }),
    );
  }

  ngOnDestroy(): void {
    if (!this.isBrowser) return;
    cancelAnimationFrame(this.frame);
    this.el.nativeElement.removeEventListener('pointermove', this.onMove);
  }
}
