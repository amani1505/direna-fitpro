import { Component } from '@angular/core';
import { isPrime } from '@utils/check-prime-number';
import { BlogCardComponent } from './blog-card/blog-card.component';

@Component({
  selector: 'all-blogs-pageview',
  standalone: true,
  imports: [BlogCardComponent],
  templateUrl: './all-blogs-pageview.component.html',
  styleUrl: './all-blogs-pageview.component.scss',
})
export class AllBlogsPageviewComponent {
  fitnessBlogPosts = [
    {
      id: 1,
      title: 'The Benefits of Strength Training',
      description:
        'Strength training is essential for building muscle, increasing metabolism, and improving overall health. In this article, we explore the various benefits of incorporating strength training into your fitness routine, including enhanced bone density and better joint health.',
      image:
        'https://plus.unsplash.com/premium_photo-1663100764663-418395b1dd86?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      date: '2024-10-01',
    },
    {
      id: 2,
      title: '10 Tips for Effective Weight Loss',
      description:
        'Losing weight can be a challenging journey. Here are ten proven tips to help you achieve your weight loss goals, from dietary changes to exercise strategies and maintaining motivation throughout the process.',
      image:
        'https://images.unsplash.com/photo-1470167290877-7d5d3446de4c?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      date: '2024-10-05',
    },
    {
      id: 3,
      title: 'How to Stay Motivated at the Gym',
      description:
        'Staying motivated to work out can be tough. This article discusses effective strategies to keep your motivation high, such as setting goals, tracking progress, and finding a workout buddy.',
      image:
        'https://images.unsplash.com/photo-1581009137042-c552e485697a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      date: '2024-09-28',
    },
    {
      id: 4,
      title: 'The Importance of Hydration for Fitness',
      description:
        'Proper hydration is crucial for optimal performance and recovery in fitness. In this post, we dive into the importance of staying hydrated, how much water you should drink, and the effects of dehydration on your workout.',
      image:
        'https://media.istockphoto.com/id/1253676339/photo/make-sure-you-stay-hydrated-throughout-your-session.webp?a=1&b=1&s=612x612&w=0&k=20&c=tBM2l140fOBpV7MWrWDXFMyyhIKrEepsZnU4upytebY=',
      date: '2024-09-20',
    },
    {
      id: 5,
      title: 'Yoga: A Path to Flexibility and Mindfulness',
      description:
        "Yoga is not just about flexibility; it's also about mindfulness and stress relief. Explore the different styles of yoga and how they can contribute to your overall fitness and mental health.",
      image:
        'https://plus.unsplash.com/premium_photo-1661777196224-bfda51e61cfd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8eW9nYXxlbnwwfHwwfHx8MA%3D%3D',
      date: '2024-09-15',
    },
  ];

  isPrime(index: number): boolean {
    return isPrime(index);
  }
}
