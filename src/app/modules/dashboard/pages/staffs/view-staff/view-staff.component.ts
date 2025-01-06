import { Component } from '@angular/core';
import { ViewStaffPageviewComponent } from '@modules/dashboard/page-sections/staffs-pageview/view-staff-pageview/view-staff-pageview.component';

@Component({
  selector: 'app-view-staff',
  standalone: true,
  imports: [ViewStaffPageviewComponent],
  templateUrl: './view-staff.component.html',
  styleUrl: './view-staff.component.scss',
})
export class ViewStaffComponent {}
