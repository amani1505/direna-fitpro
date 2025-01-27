import { Component } from '@angular/core';
import { ViewClassPageviewComponent } from '@modules/dashboard/page-sections/class-pageview/view-class-pageview/view-class-pageview.component';

@Component({
  selector: 'app-view-class',
  standalone: true,
  imports: [ViewClassPageviewComponent],
  templateUrl: './view-class.component.html',
  styleUrl: './view-class.component.scss',
})
export class ViewClassComponent {}
