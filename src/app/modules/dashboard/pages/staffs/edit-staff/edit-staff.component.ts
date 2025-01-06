import { Component } from '@angular/core';
import { EditStaffPageviewComponent } from '@modules/dashboard/page-sections/staffs-pageview/edit-staff-pageview/edit-staff-pageview.component';

@Component({
  selector: 'app-edit-staff',
  standalone: true,
  imports: [EditStaffPageviewComponent],
  templateUrl: './edit-staff.component.html',
  styleUrl: './edit-staff.component.scss',
})
export class EditStaffComponent {}
