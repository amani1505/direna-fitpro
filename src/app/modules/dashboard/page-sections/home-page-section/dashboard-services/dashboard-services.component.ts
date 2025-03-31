import { Component } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'dashboard-services',
  standalone: true,
  imports: [AngularSvgIconModule],
  templateUrl: './dashboard-services.component.html',
  styleUrl: './dashboard-services.component.scss',
})
export class DashboardServicesComponent {}
