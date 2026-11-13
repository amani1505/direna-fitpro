import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CreateStaffPageviewComponent } from '@modules/dashboard/page-sections/staffs-pageview/create-staff-pageview/create-staff-pageview.component';

@Component({
  selector: 'app-create-staff',
  imports: [CreateStaffPageviewComponent],
  templateUrl: './create-staff.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './create-staff.component.scss',
})
export class CreateStaffComponent {}
