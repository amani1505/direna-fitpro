import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MembersPageviewComponent } from '@modules/dashboard/page-sections/members-pageview/members-pageview.component';

@Component({
  selector: 'app-members',
  imports: [MembersPageviewComponent],
  templateUrl: './members.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './members.component.scss',
})
export class MembersComponent {

}
