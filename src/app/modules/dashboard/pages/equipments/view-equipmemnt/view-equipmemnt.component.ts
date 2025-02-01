import { Component } from '@angular/core';
import { ViewEquipmemntPageviewComponent } from '@modules/dashboard/page-sections/equipments-pageview/view-equipmemnt-pageview/view-equipmemnt-pageview.component';

@Component({
  selector: 'app-view-equipmemnt',
  standalone: true,
  imports: [ViewEquipmemntPageviewComponent],
  templateUrl: './view-equipmemnt.component.html',
  styleUrl: './view-equipmemnt.component.scss',
})
export class ViewEquipmemntComponent {}
