import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HomePageSectionComponent } from '@modules/dashboard/page-sections/home-page-section/home-page-section.component';

@Component({
  selector: 'app-home',
  imports: [HomePageSectionComponent],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
