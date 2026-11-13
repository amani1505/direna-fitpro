import { Component, ChangeDetectionStrategy } from '@angular/core';
import { EditStaffPageviewComponent } from '@modules/dashboard/page-sections/staffs-pageview/edit-staff-pageview/edit-staff-pageview.component';

@Component({
  selector: 'app-edit-staff',
  imports: [EditStaffPageviewComponent],
  templateUrl: './edit-staff.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './edit-staff.component.scss',
})
export class EditStaffComponent {}
