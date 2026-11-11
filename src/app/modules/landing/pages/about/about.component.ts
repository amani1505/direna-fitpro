import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '@directive/reveal.directive';
import { SpotlightDirective } from '@directive/spotlight.directive';
import { AboutSectionComponent } from '@modules/landing/components/about-section/about-section.component';
import { TeamMemberComponent } from '@modules/landing/components/team-member/team-member.component';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
    selector: 'app-about',
    imports: [
        CommonModule,
        RouterLink,
        AngularSvgIconModule,
        AboutSectionComponent,
        TeamMemberComponent,
        RevealDirective,
        SpotlightDirective,
    ],
    templateUrl: './about.component.html',
    styleUrl: './about.component.scss'
})
export class AboutComponent {
  /** Services named in the company description. */
  readonly services = [
    {
      title: 'Expert advice',
      text: 'Guidance on the right equipment and layout for your goals, space and budget.',
      icon: 'assets/icons/heroicons/outline/users.svg',
      tone: 'bg-secondary-500/10 text-secondary-600 dark:text-secondary-300',
      span: 'md:col-span-2',
    },
    {
      title: 'Installation',
      text: 'We set up every machine properly, so it is safe and ready from day one.',
      icon: 'assets/icons/heroicons/outline/cog-8-tooth.svg',
      tone: 'bg-primary-500/10 text-primary-600 dark:text-primary-300',
      span: '',
    },
    {
      title: 'Maintenance',
      text: 'Ongoing care that keeps your equipment running.',
      icon: 'assets/icons/heroicons/outline/shield-check.svg',
      tone: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
      span: '',
    },
  ];

  /** Values named in the company description. */
  readonly values = [
    {
      title: 'Quality',
      text: 'Premium equipment and services that meet international standards.',
    },
    {
      title: 'Trust',
      text: 'Reliable equipment and service for clients, locally and internationally.',
    },
    {
      title: 'Collaboration',
      text: 'We work closely with every client to meet their needs efficiently.',
    },
  ];

  teamMembers = [
    {
      name: 'Jane Doe',
      role: 'Certified Fitness Trainer',
      imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTEwfHxneW0lMjB0cmFpbmVycyUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D',
    },
    {
      name: 'John Smith',
      role: 'Nutrition Specialist',
      imageUrl: 'https://plus.unsplash.com/premium_photo-1663036312913-620738b33f69?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGd5bSUyMHRyYWluZXJzJTIwcHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D',
    },
    {
      name: 'Emily Johnson',
      role: 'Yoga Instructor',
      imageUrl: 'https://plus.unsplash.com/premium_photo-1682435111671-dc6542c642e7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGd5bSUyMHRyYWluZXJzJTIwcHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D',
    },
  ];
}
