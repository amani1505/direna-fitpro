import { Component } from '@angular/core';
import { UserDashboardPageviewComponent } from '@modules/landing/components/user-dashboard-pageview/user-dashboard-pageview.component';

@Component({
    selector: 'app-user-dashboard',
    imports: [UserDashboardPageviewComponent],
    templateUrl: './user-dashboard.component.html',
    styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent {}
