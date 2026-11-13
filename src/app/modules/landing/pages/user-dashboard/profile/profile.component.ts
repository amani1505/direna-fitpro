import { Component, ChangeDetectionStrategy } from '@angular/core';
import { UserProfilePageviewComponent } from '@modules/landing/components/user-dashboard-pageview/user-profile-pageview/user-profile-pageview.component';

@Component({
  selector: 'app-profile',
  imports: [UserProfilePageviewComponent],
  templateUrl: './profile.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {}
