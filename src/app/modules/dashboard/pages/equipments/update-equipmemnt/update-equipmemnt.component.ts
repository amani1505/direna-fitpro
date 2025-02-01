import { Component } from '@angular/core';
import { UpdateEquipmemntPageviewComponent } from '@modules/dashboard/page-sections/equipments-pageview/update-equipmemnt-pageview/update-equipmemnt-pageview.component';

@Component({
  selector: 'app-update-equipmemnt',
  standalone: true,
  imports: [UpdateEquipmemntPageviewComponent],
  templateUrl: './update-equipmemnt.component.html',
  styleUrl: './update-equipmemnt.component.scss',
})
export class UpdateEquipmemntComponent {}
