import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { User } from '@model/user';
import { AuthService } from '@service/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { HeaderCardsComponent } from "./header-cards/header-cards.component";
import { DashboardBranchesComponent } from "./dashboard-branches/dashboard-branches.component";
import { DashboardServicesComponent } from "./dashboard-services/dashboard-services.component";
import { DashboardEquipmentComponent } from "./dashboard-equipment/dashboard-equipment.component";

@Component({
  selector: 'home-page-section',
  standalone: true,
  imports: [HeaderCardsComponent, DashboardBranchesComponent, DashboardServicesComponent, DashboardEquipmentComponent],
  templateUrl: './home-page-section.component.html',
  styleUrl: './home-page-section.component.scss',
})
export class HomePageSectionComponent implements OnInit, OnDestroy {
  private _authService = inject(AuthService);
  private destroy$ = new Subject<void>();
  user: User | null = null;

  greeting: string = '';
  currentTime: Date = new Date();

  ngOnInit() {
    this._authService.userLoaded$
      .pipe(takeUntil(this.destroy$))
      .subscribe((loaded) => {
        if (loaded) {
          this.user = this._authService.user();
        }
      });
    this.updateGreeting();

    // Update greeting every minute for client-side changes
    if (typeof window !== 'undefined') {
      setInterval(() => {
        this.currentTime = new Date();
        this.updateGreeting();
      }, 60000);
    }
  }

  updateGreeting() {
    const hour = this.currentTime.getHours();

    if (hour >= 5 && hour < 12) {
      this.greeting = 'Good Morning, ';
    } else if (hour >= 12 && hour < 17) {
      this.greeting = 'Good Afternoon, ';
    } else if (hour >= 17 && hour < 24) {
      this.greeting = 'Good Evening, ';
    } else if (hour >= 1 && hour < 5) {
      this.greeting = "It's Late - Time for Bed, ";
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
