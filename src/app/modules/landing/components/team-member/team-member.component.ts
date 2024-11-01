import { Component, Input } from '@angular/core';

@Component({
  selector: 'team-member',
  standalone: true,
  imports: [],
  templateUrl: './team-member.component.html',
  styleUrl: './team-member.component.scss',
})
export class TeamMemberComponent {
  @Input() name: string = '';
  @Input() role: string = '';
  @Input() imageUrl: string = '';
}
