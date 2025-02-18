import { Component } from '@angular/core';
import { ViewSinglePageviewComponent } from '@modules/landing/components/equipments-pageview/view-single-pageview/view-single-pageview.component';

@Component({
  selector: 'app-view-single',
  standalone: true,
  imports: [ViewSinglePageviewComponent],
  templateUrl: './view-single.component.html',
  styleUrl: './view-single.component.scss'
})
export class ViewSingleComponent {

}
