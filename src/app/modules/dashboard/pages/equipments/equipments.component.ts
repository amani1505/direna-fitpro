import { Component, ChangeDetectionStrategy } from '@angular/core';
import { EquipmentsPageviewComponent } from '@modules/dashboard/page-sections/equipments-pageview/equipments-pageview.component';

@Component({
  selector: 'app-equipments',
  imports: [EquipmentsPageviewComponent],
  templateUrl: './equipments.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './equipments.component.scss',
})
export class EquipmentsComponent {}
