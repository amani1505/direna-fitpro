import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CreateMemberPageviewComponent } from '@modules/dashboard/page-sections/members-pageview/create-member-pageview/create-member-pageview.component';

@Component({
  selector: 'app-create-member',
  imports: [CreateMemberPageviewComponent],
  templateUrl: './create-member.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './create-member.component.scss',
})
export class CreateMemberComponent {}
