import { Component } from '@angular/core';
import { RevealDirective } from '@directive/reveal.directive';

interface BlogInterface {
  id: string;
  title: string;
  date: string;
  description: string;
  image:string;
}
@Component({
  selector: 'blog',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent {
  blogs: Array<BlogInterface> = [
    {
      id: '1',
      title: 'Going to the gym for the first time',
      date: 'June 15, 2022',
      image:'./assets/images/blog-1.jpg',
      description:
        ' Praesent id ipsum pellentesque lectus dapibus condimentum curabitur eget risus quam. In hac  habitasse platea dictumst.',
    },
    {
      id: '2',
      title: 'The benefits of regular exercise',
      date: 'July 12, 2022',
      image:'./assets/images/blog-2.jpg',
      description:
        ' Curabitur vel dui vel neque efficitur consectetur. Donec eget dolor lacinia, dictum ipsum eu, commodo ligula.',
    },
    {
      id: '3',
      title: 'Mindfulness and stress management',
      date: 'August 8, 2022',
      image:'./assets/images/blog-3.jpg',
      description:
        ' Nullam vel eros vel neque bibendum faucibus. Sed id neque vel lectus consequat consectetur.',
    },
  ];
}
