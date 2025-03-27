import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { AddressComponent } from './address/address.component';
import { SecurityComponent } from './security/security.component';
import { User } from '@model/user';
import { AuthService } from '@service/auth.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'user-profile-pageview',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PersonalInformationComponent,
    AddressComponent,
    SecurityComponent,
  ],
  templateUrl: './user-profile-pageview.component.html',
  styleUrl: './user-profile-pageview.component.scss',
})
export class UserProfilePageviewComponent implements OnInit, OnDestroy {
  private _authService = inject(AuthService);
  private destroy$ = new Subject<void>();
  user: User | null = null;

  activeTab:
    | 'personal'
    | 'addresses'
    | 'payment'
    | 'notifications'
    | 'security' = 'personal';

  tabs: Array<{
    title: string;
    icon: string;
    value: 'personal' | 'addresses' | 'payment' | 'notifications' | 'security';
  }> = [
    {
      title: 'Personal',
      icon: 'person',
      value: 'personal',
    },
    {
      title: 'Addresses',
      icon: 'home',
      value: 'addresses',
    },
    // {
    //   title: 'Payment',
    //   icon: 'payment',
    //   value: 'payment',
    // },
    // {
    //   title: 'Notifications',
    //   icon: 'notifications',
    //   value: 'notifications',
    // },
    {
      title: 'Security',
      icon: 'security',
      value: 'security',
    },
  ];

  setActiveTab(
    tab: 'personal' | 'addresses' | 'payment' | 'notifications' | 'security',
  ): void {
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
