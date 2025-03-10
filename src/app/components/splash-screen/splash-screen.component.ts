import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, inject, OnInit, signal, viewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash-screen',
  standalone: true,
  imports: [],
  animations: [
    trigger('logoAnimation', [
      state('initial', style({
        transform: 'scale(0.2)',
        opacity: 0
      })),
      state('visible', style({
        transform: 'scale(1)',
        opacity: 1
      })),
      transition('initial => visible', animate('1000ms cubic-bezier(0.175, 0.885, 0.32, 1.275)'))
    ]),
    trigger('textAnimation', [
      state('initial', style({
        transform: 'translateY(20px)',
        opacity: 0
      })),
      state('visible', style({
        transform: 'translateY(0)',
        opacity: 1
      })),
      transition('initial => visible', animate('800ms 600ms ease-out'))
    ]),
    trigger('loadingAnimation', [
      state('initial', style({
        transform: 'translateY(20px)',
        opacity: 0
      })),
      state('visible', style({
        transform: 'translateY(0)',
        opacity: 1
      })),
      transition('initial => visible', animate('800ms 1200ms ease-out'))
    ]),
    trigger('fadeAnimation', [
      state('initial', style({ opacity: 0 })),
      state('visible', style({ opacity: 1 })),
      transition('initial => visible', animate('800ms 1400ms ease-out'))
    ])
  ],

  templateUrl: './splash-screen.component.html',
  styleUrl: './splash-screen.component.scss'
})
export class SplashScreenComponent implements OnInit {
  private router = inject(Router);

  // State signals using Angular 18's signal API
  logoState = signal<string>('initial');
  textState = signal<string>('initial');
  loadingState = signal<string>('initial');
  loadingProgress = signal<number>(0);
  loadingText = signal<string>('Loading...');
  backgroundDots = signal<any[]>([]);

  // Lifecycle hooks
  ngOnInit() {
    // Generate background dots
    this.generateBackgroundDots();

    // Start animations
    setTimeout(() => this.logoState.set('visible'), 100);
    setTimeout(() => this.textState.set('visible'), 200);
    setTimeout(() => this.loadingState.set('visible'), 300);

    // Simulate loading progress
    let progress = 0;
    const loadingInterval = setInterval(() => {
      progress += Math.random() * 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(loadingInterval);
        this.loadingText.set('Ready!');

        // Navigate to main app after a delay
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 800);
      }
      this.loadingProgress.set(progress);
    }, 200);
  }

  // Create animated background elements
  private generateBackgroundDots() {
    const dots = [];
    const colors = ['#ff4836', '#2d6f17', '#ff7d66', '#45a825'];

    for (let i = 0; i < 40; i++) {
      dots.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 80 + 20,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: Math.random() * 4 + 3,
        delay: Math.random() * 2
      });
    }

    this.backgroundDots.set(dots);
  }
}
