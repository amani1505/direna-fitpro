import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MembersPageviewComponent } from '@modules/dashboard/page-sections/members-pageview/members-pageview.component';

@Component({
  selector: 'app-members',
  imports: [MembersPageviewComponent],
  templateUrl: './members.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './members.component.scss',
})
export class MembersComponent implements OnInit {
  constructor() {
    // Ensure initialization is consistent
  }

  ngOnInit() {
    // Avoid any client-only operations during initial render
  }
}
