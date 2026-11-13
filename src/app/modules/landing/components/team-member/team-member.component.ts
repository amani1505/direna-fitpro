import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'team-member',
  imports: [],
  templateUrl: './team-member.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './team-member.component.scss',
})
export class TeamMemberComponent {
  @Input() name: string = '';
  @Input() role: string = '';
  @Input() imageUrl: string = '';
}
