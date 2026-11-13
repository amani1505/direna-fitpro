import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ViewStaffPageviewComponent } from '@modules/dashboard/page-sections/staffs-pageview/view-staff-pageview/view-staff-pageview.component';

@Component({
  selector: 'app-view-staff',
  imports: [ViewStaffPageviewComponent],
  templateUrl: './view-staff.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './view-staff.component.scss',
})
export class ViewStaffComponent {}
