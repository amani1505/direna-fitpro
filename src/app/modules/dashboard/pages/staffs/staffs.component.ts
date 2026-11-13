import { Component, ChangeDetectionStrategy } from '@angular/core';
import { StaffsPageviewComponent } from '@modules/dashboard/page-sections/staffs-pageview/staffs-pageview.component';

@Component({
  selector: 'app-staffs',
  imports: [StaffsPageviewComponent],
  templateUrl: './staffs.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './staffs.component.scss',
})
export class StaffsComponent {}
