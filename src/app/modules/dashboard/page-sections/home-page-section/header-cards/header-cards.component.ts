import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CountData } from '@model/dashboard';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'header-cards',
  standalone: true,
  imports: [AngularSvgIconModule, NgClass, RouterModule],
  templateUrl: './header-cards.component.html',
  styleUrl: './header-cards.component.scss',
})
export class HeaderCardsComponent {
  @Input() dashboardStats: CountData[] = [];
}
