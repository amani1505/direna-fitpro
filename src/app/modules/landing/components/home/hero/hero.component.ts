import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface HeroInterface {
  id: string;
  image: string;
  title: string;
  subtitle: string;
}

@Component({
  selector: 'hero',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  hero: HeroInterface = {
    id: '1',
    image: './assets/images/hero-banner.png',
    title: 'Work Hard To Get Better Life',
    subtitle:
      'Achieve your health goals with modern equipment and tailored workout programs',
  };
}
