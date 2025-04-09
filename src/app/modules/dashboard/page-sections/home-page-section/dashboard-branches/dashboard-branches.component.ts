import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Branch } from '@model/branch.interface';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'dashboard-branches',
  standalone: true,
  imports: [AngularSvgIconModule, RouterModule],
  templateUrl: './dashboard-branches.component.html',
  styleUrl: './dashboard-branches.component.scss',
})
export class DashboardBranchesComponent {
  @Input() branches: Branch[] = [];
}
