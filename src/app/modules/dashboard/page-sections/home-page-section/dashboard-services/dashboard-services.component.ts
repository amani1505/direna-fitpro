import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Services } from '@model/services.interface';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'dashboard-services',
  standalone: true,
  imports: [AngularSvgIconModule, RouterModule],
  templateUrl: './dashboard-services.component.html',
  styleUrl: './dashboard-services.component.scss',
})
export class DashboardServicesComponent {
  @Input() services: Services[] = [];
}
