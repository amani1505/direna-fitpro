import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ViewEquipmemntPageviewComponent } from '@modules/dashboard/page-sections/equipments-pageview/view-equipmemnt-pageview/view-equipmemnt-pageview.component';

@Component({
  selector: 'app-view-equipmemnt',
  imports: [ViewEquipmemntPageviewComponent],
  templateUrl: './view-equipmemnt.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './view-equipmemnt.component.scss',
})
export class ViewEquipmemntComponent {}
