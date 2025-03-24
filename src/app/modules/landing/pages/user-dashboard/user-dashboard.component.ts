import { Component } from '@angular/core';
import { BreadCrumbsComponent } from '@components/bread-crumbs/bread-crumbs.component';
import { UserDashboardPageviewComponent } from '@modules/landing/components/user-dashboard-pageview/user-dashboard-pageview.component';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [UserDashboardPageviewComponent, BreadCrumbsComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss',
})
export class UserDashboardComponent {}
