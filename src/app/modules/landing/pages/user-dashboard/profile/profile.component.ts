import { Component } from '@angular/core';
import { BreadCrumbsComponent } from '@components/bread-crumbs/bread-crumbs.component';
import { UserProfilePageviewComponent } from '@modules/landing/components/user-dashboard-pageview/user-profile-pageview/user-profile-pageview.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [UserProfilePageviewComponent, BreadCrumbsComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {}
