import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '@directive/reveal.directive';
import { SpotlightDirective } from '@directive/spotlight.directive';

interface ClassInterface {
  id: string;
  image: string;
  icon: string;
  title: string;
  description: string;
  classFull: number;
}

/** Circumference of the capacity ring (r = 18). */
const RING = 2 * Math.PI * 18;

@Component({
    selector: 'class',
    imports: [RevealDirective, SpotlightDirective, RouterLink],
    templateUrl: './class.component.html',
    styleUrl: './class.component.scss'
})
export class ClassComponent {
  @ViewChild('track') track?: ElementRef<HTMLUListElement>;

  readonly ring = RING;

  classData: Array<ClassInterface> = [
    {
      id: '1',
      image: './assets/images/class-1.jpg',
      icon: './assets/images/class-icon-1.png',
      title: 'Weight Lifting',
      description:
        'Build strength with barbells and dumbbells, with coaching on safe technique.',
      classFull: 85,
    },
    {
      id: '2',
      image: './assets/images/class-2.jpg',
      icon: './assets/images/class-icon-2.png',
      title: 'Cardio & Strength',
      description:
        'Mix heart-pumping cardio with strength moves to boost stamina and power.',
      classFull: 70,
    },
    {
      id: '3',
      image: './assets/images/class-3.jpg',
      icon: './assets/images/class-icon-3.png',
      title: 'Yoga & Pilates',
      description:
        'Improve flexibility, balance and core strength through guided flows.',
      classFull: 90,
    },
    {
      id: '4',
      image: './assets/images/class-4.jpg',
      icon: './assets/images/class-icon-4.png',
      title: 'Mind & Body',
      description:
        'Slow down, breathe and recover with sessions that connect movement and focus.',
      classFull: 60,
    },
  ];

  /** Stroke offset that fills the ring to `percent`. */
  ringOffset(percent: number): number {
    const p = Math.min(Math.max(percent, 0), 100);
    return RING * (1 - p / 100);
  }

  /** Scroll the mobile carousel by one card. */
  scroll(direction: 1 | -1): void {
    const el = this.track?.nativeElement;
    const card = el?.querySelector('li');
    if (!el || !card) return;
    el.scrollBy({ left: direction * (card.getBoundingClientRect().width + 16), behavior: 'smooth' });
  }
}
