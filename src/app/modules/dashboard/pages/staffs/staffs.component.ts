import { Component } from '@angular/core';
import { StaffsPageviewComponent } from '@modules/dashboard/page-sections/staffs-pageview/staffs-pageview.component';

@Component({
  selector: 'app-staffs',
  standalone: true,
  imports: [StaffsPageviewComponent],
  templateUrl: './staffs.component.html',
  styleUrl: './staffs.component.scss',
})
export class StaffsComponent {}
