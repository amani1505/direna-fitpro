import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Services } from '@model/services.interface';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'dashboard-services',
  imports: [AngularSvgIconModule, RouterModule],
  templateUrl: './dashboard-services.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './dashboard-services.component.scss',
})
export class DashboardServicesComponent {
  @Input() services: Services[] = [];
}
