import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ViewClassPageviewComponent } from '@modules/dashboard/page-sections/class-pageview/view-class-pageview/view-class-pageview.component';

@Component({
  selector: 'app-view-class',
  imports: [ViewClassPageviewComponent],
  templateUrl: './view-class.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './view-class.component.scss',
})
export class ViewClassComponent {}
