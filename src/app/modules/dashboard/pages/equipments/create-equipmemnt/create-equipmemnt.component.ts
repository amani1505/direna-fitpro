import { Component } from '@angular/core';
import { CreateEquipmemntPageviewComponent } from '@modules/dashboard/page-sections/equipments-pageview/create-equipmemnt-pageview/create-equipmemnt-pageview.component';

@Component({
  selector: 'app-create-equipmemnt',
  standalone: true,
  imports: [CreateEquipmemntPageviewComponent],
  templateUrl: './create-equipmemnt.component.html',
  styleUrl: './create-equipmemnt.component.scss',
})
export class CreateEquipmemntComponent {}
