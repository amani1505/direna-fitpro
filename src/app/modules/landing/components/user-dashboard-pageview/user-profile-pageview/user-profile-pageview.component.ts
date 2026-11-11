import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { User } from '@model/user';
import { AuthService } from '@service/auth.service';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Subject, takeUntil } from 'rxjs';
import { AddressComponent } from './address/address.component';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { SecurityComponent } from './security/security.component';

type ProfileTab = 'personal' | 'addresses' | 'security';

@Component({
  selector: 'user-profile-pageview',
  standalone: true,
  imports: [AngularSvgIconModule, PersonalInformationComponent, AddressComponent, SecurityComponent],
  templateUrl: './user-profile-pageview.component.html',
  styleUrl: './user-profile-pageview.component.scss',
})
export class UserProfilePageviewComponent implements OnInit, OnDestroy {
  private _authService = inject(AuthService);
  private destroy$ = new Subject<void>();
  user: User | null = null;

  activeTab: ProfileTab = 'personal';

  tabs: Array<{ title: string; icon: string; value: ProfileTab }> = [
    { title: 'Personal', icon: './assets/icons/heroicons/outline/person.svg', value: 'personal' },
    { title: 'Addresses', icon: './assets/icons/heroicons/outline/building-office-2.svg', value: 'addresses' },
    { title: 'Password', icon: './assets/icons/heroicons/outline/lock-closed.svg', value: 'security' },
  ];

  setActiveTab(tab: ProfileTab): void {
    this.activeTab = tab;
  }

  ngOnInit() {
    this._authService.userLoaded$
      .pipe(takeUntil(this.destroy$))
      .subscribe((loaded) => {
        if (loaded) {
          this.user = this._authService.user();
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
