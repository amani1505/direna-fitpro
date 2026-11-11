import { Component, Input, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { ThemeService } from '@service/theme.service';

let nextId = 0;

/**
 * Round sun/moon button. The sun's disc swells and a mask slides across it to
 * carve a crescent; the rays spin away. The page then switches theme with a
 * circular reveal that starts at the button (see ThemeService.toggle).
 */
@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [NgClass],
  template: `
    <button
      type="button"
      class="theme-toggle"
      [ngClass]="btnClass"
      [class.is-dark]="theme.dark()"
      [attr.aria-label]="theme.dark() ? 'Switch to light mode' : 'Switch to dark mode'"
      [attr.aria-pressed]="theme.dark()"
      [attr.title]="theme.dark() ? 'Light mode' : 'Dark mode'"
      (click)="theme.toggle($event)"
    >
      <svg viewBox="0 0 24 24" class="tt-icon" aria-hidden="true">
        <mask [attr.id]="maskId">
          <rect x="0" y="0" width="24" height="24" fill="white" />
          <circle class="tt-cut" cx="17" cy="7" r="6" fill="black" />
        </mask>
        <circle
          class="tt-disc"
          cx="12"
          cy="12"
          r="5"
          fill="currentColor"
          [attr.mask]="'url(#' + maskId + ')'"
        />
        <g class="tt-rays" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <line x1="12" y1="1.5" x2="12" y2="3.5" />
          <line x1="12" y1="20.5" x2="12" y2="22.5" />
          <line x1="1.5" y1="12" x2="3.5" y2="12" />
          <line x1="20.5" y1="12" x2="22.5" y2="12" />
          <line x1="4.6" y1="4.6" x2="6" y2="6" />
          <line x1="18" y1="18" x2="19.4" y2="19.4" />
          <line x1="4.6" y1="19.4" x2="6" y2="18" />
          <line x1="18" y1="6" x2="19.4" y2="4.6" />
        </g>
      </svg>
    </button>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
      }

      .theme-toggle {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 999px;
        transition:
          transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
          background-color 0.2s ease,
          color 0.2s ease;
      }

      .theme-toggle:hover {
        transform: rotate(-12deg) scale(1.06);
      }

      .theme-toggle:active {
        transform: scale(0.88);
      }

      .tt-icon {
        width: 1.35rem;
        height: 1.35rem;
        overflow: visible;
      }

      .tt-disc,
      .tt-cut,
      .tt-rays {
        transform-box: fill-box;
        transform-origin: center;
        transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
          opacity 0.3s ease;
      }

      .tt-cut {
        transform: translate(9px, -9px);
      }

      .tt-rays {
        transform-box: view-box;
      }

      .is-dark .tt-disc {
        transform: scale(1.7);
      }

      .is-dark .tt-cut {
        transform: translate(0, 0);
      }

      .is-dark .tt-rays {
        transform: rotate(-90deg) scale(0.4);
        opacity: 0;
      }
    `,
  ],
})
export class ThemeToggleComponent {
  readonly theme = inject(ThemeService);
  readonly maskId = `tt-mask-${nextId++}`;

  /** Extra classes for colour/background, e.g. 'bg-surface-2 text-ink'. */
  @Input() btnClass: string | string[] | Record<string, boolean> =
    'bg-surface-2 text-ink hover:bg-primary-500 hover:text-white';
}
