import { Component } from '@angular/core';

interface HeroInterface {
  id: string;
  image: string;
  title: string;
  subtitle: string;
}

@Component({
  selector: 'hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  hero: HeroInterface = {
    id: '1',
    image: './assets/images/hero-banner.png',
    title: 'Work Hard To Get Better Life',
    subtitle:
      'Duis mollis felis quis libero dictum vehicula. Duis dictum lorem mi, a faucibus nisi eleifend eu.',
  };
}
