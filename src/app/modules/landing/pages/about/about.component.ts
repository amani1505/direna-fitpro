import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AboutSectionComponent } from '@modules/landing/components/about-section/about-section.component';
import { LocationComponent } from '@modules/landing/components/location/location.component';
import { TeamMemberComponent } from '@modules/landing/components/team-member/team-member.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    AboutSectionComponent,
    LocationComponent,
    TeamMemberComponent,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
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
