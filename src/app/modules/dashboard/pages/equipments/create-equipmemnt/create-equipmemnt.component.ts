import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CreateEquipmemntPageviewComponent } from '@modules/dashboard/page-sections/equipments-pageview/create-equipmemnt-pageview/create-equipmemnt-pageview.component';

@Component({
  selector: 'app-create-equipmemnt',
  imports: [CreateEquipmemntPageviewComponent],
  templateUrl: './create-equipmemnt.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './create-equipmemnt.component.scss',
})
export class CreateEquipmemntComponent {}
