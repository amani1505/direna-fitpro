import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ViewSinglePageviewComponent } from '@modules/landing/components/equipments-pageview/view-single-pageview/view-single-pageview.component';

@Component({
  selector: 'app-view-single',
  imports: [ViewSinglePageviewComponent],
  templateUrl: './view-single.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './view-single.component.scss',
})
export class ViewSingleComponent {}
