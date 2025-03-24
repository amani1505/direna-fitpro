import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PersonalInformationComponent } from "./personal-information/personal-information.component";
import { AddressComponent } from "./address/address.component";
import { SecurityComponent } from "./security/security.component";



@Component({
  selector: 'user-profile-pageview',
  standalone: true,
  imports: [CommonModule, FormsModule, PersonalInformationComponent, AddressComponent, SecurityComponent],
  templateUrl: './user-profile-pageview.component.html',
  styleUrl: './user-profile-pageview.component.scss',
})
export class UserProfilePageviewComponent {
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






}
