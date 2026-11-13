import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';

@Component({
  selector: 'equipments-pageview',
  imports: [LayoutComponent],
  templateUrl: './equipments-pageview.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './equipments-pageview.component.scss',
})
export class EquipmentsPageviewComponent {}
