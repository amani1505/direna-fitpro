import { Component } from '@angular/core';
import { CreateStaffPageviewComponent } from '@modules/dashboard/page-sections/staffs-pageview/create-staff-pageview/create-staff-pageview.component';

@Component({
  selector: 'app-create-staff',
  standalone: true,
  imports: [CreateStaffPageviewComponent],
  templateUrl: './create-staff.component.html',
  styleUrl: './create-staff.component.scss',
})
export class CreateStaffComponent {}
