import { Component } from '@angular/core';
import { CreateMemberPageviewComponent } from '@modules/dashboard/page-sections/members-pageview/create-member-pageview/create-member-pageview.component';

@Component({
  selector: 'app-create-member',
  standalone: true,
  imports: [CreateMemberPageviewComponent],
  templateUrl: './create-member.component.html',
  styleUrl: './create-member.component.scss'
})
export class CreateMemberComponent {

}
