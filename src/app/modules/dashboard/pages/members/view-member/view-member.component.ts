import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ViewMemberPageviewComponent } from '@modules/dashboard/page-sections/members-pageview/view-member-pageview/view-member-pageview.component';

@Component({
  selector: 'app-view-member',
  imports: [ViewMemberPageviewComponent],
  templateUrl: './view-member.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './view-member.component.scss',
})
export class ViewMemberComponent {}
