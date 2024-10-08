import { Component } from '@angular/core';

interface ClassInterface {
  id: string;
  image: string;
  icon: string;
  title: string;
  description: string;
  classFull: number;
}
@Component({
  selector: 'class',
  standalone: true,
  imports: [],
  templateUrl: './class.component.html',
  styleUrl: './class.component.scss',
})
export class ClassComponent {
  classData: Array<ClassInterface> = [
    {
      id: '1',
      image: './assets/images/class-1.jpg',
      icon: './assets/images/class-icon-1.png',
      title: 'Weight Lifting',
      description:
        ' Suspendisse nisi libero, cursus ac magna sit amet, fermentum imperdiet nisi.',
      classFull: 85,
    },
    {
      id: '2',
      image: './assets/images/class-2.jpg',
      icon: './assets/images/class-icon-2.png',
      title: 'Cardio & Strenght',
      description:
        ' Aliquam faucibus turpis eu dolor sagittis, vitae condimentum lectus sagittis.',
      classFull: 70,
    },
    {
      id: '3',
      image: './assets/images/class-3.jpg',
      icon: './assets/images/class-icon-3.png',
      title: 'Yoga & Pilates',
      description:
        ' Sed non tortor non odio rutrum finibus, ac pulvinar neque gravida.',
      classFull: 90,
    },
    {
      id: '4',
      image: './assets/images/class-4.jpg',
      icon: './assets/images/class-icon-4.png',
      title: 'Mind & Body',
      description:
        ' Proin consectetur, felis id condimentum ullamcorper, felis velit iaculis velit.',
      classFull: 60,
    },
  ];
}
