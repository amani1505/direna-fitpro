import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface AboutInterface {
  id: string;
  title: string;
  description: string;
  subDescription: string;
  ownerImage: string;
  ownerName: string;
  ownerPosition: string;
  image: string;
}

@Component({
  selector: 'about',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  about: AboutInterface = {
    id: '1',
    title: 'Welcome To Our Fitness Gym',
    description:
      'Direna FitPro, a division of Direna Solution Group, specializes in supplying top-quality sports equipment and gym solutions both locally and internationally. We are committed to enhancing health and wellness with state-of-the-art products and services.',
    subDescription:
      'With 5+ years of experience, we provide top-quality fitness equipment, expert advice, installation, and maintenance services.',
    ownerImage: './assets/images/about-coach.jpg',
    ownerName: 'Trainer Kinunda',
    ownerPosition: 'CEO, Direna Fitness Gym.',
    image: './assets/images/about-banner.png',
  };
}
