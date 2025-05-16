import { NgClass, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MemberComponent } from './member/member.component';
import { NormalUserComponent } from './normal-user/normal-user.component';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,

    AngularSvgIconModule,
    NgIf,
    MemberComponent,
    NormalUserComponent,
    NgClass,
    NgIf,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  activeTab: 'member' | 'user' = 'member';

  tabs: Array<{
    title: string;
    icon: string;
    value: 'member' | 'user';
  }> = [
    {
      title: 'Member ',
      icon: 'person',
      value: 'member',
    },
    {
      title: 'User',
      icon: 'person',
      value: 'user',
    },
  ];

  setActiveTab(tab: 'member' | 'user'): void {
    this.activeTab = tab;
  }
}
