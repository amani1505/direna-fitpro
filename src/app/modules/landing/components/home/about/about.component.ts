import { Component } from '@angular/core';

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
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  about: AboutInterface = {
    id: '1',
    title: 'Welcome To Our Fitness Gym',
    description:
      '  Nam ut hendrerit leo. Aenean vel ipsum nunc. Curabitur in tellus vitae nisi aliquet dapibus non et erat. Pellentesqueporta sapien non accumsan dignissim curabitur sagittis nulla sit amet dolor feugiat.',
    subDescription:
      'Integer placerat vitae metus posuere tincidunt. Nullam suscipit ante ac aliquet viverra vestibulum ante ipsum primis.',
    ownerImage: './assets/images/about-coach.jpg',
    ownerName: 'Trainer Kinunda',
    ownerPosition: 'CEO, Direna Fitness Gym.',
    image: './assets/images/about-banner.png',
  };
}
