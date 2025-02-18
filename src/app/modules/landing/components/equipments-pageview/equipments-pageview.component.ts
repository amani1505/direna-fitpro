import { Component } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { LayoutComponent } from './layout/layout.component';

@Component({
  selector: 'equipments-pageview',
  standalone: true,
  imports: [AngularSvgIconModule,LayoutComponent],
  templateUrl: './equipments-pageview.component.html',
  styleUrl: './equipments-pageview.component.scss',
})
export class EquipmentsPageviewComponent {}
