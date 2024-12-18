import { Component } from '@angular/core';
import { ViewMemberPageviewComponent } from '@modules/dashboard/page-sections/members-pageview/view-member-pageview/view-member-pageview.component';

@Component({
  selector: 'app-view-member',
  standalone: true,
  imports: [ViewMemberPageviewComponent],
  templateUrl: './view-member.component.html',
  styleUrl: './view-member.component.scss',
})
export class ViewMemberComponent {}
