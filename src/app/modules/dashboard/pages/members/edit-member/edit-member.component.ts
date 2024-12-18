import { Component } from '@angular/core';
import { EditMemberPageviewComponent } from '@modules/dashboard/page-sections/members-pageview/edit-member-pageview/edit-member-pageview.component';

@Component({
  selector: 'app-edit-member',
  standalone: true,
  imports: [EditMemberPageviewComponent],
  templateUrl: './edit-member.component.html',
  styleUrl: './edit-member.component.scss'
})
export class EditMemberComponent {

}
