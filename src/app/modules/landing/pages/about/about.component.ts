import { Component } from '@angular/core';
import { AboutSectionComponent } from '@modules/landing/components/about-section/about-section.component';
import { LocationComponent } from '@modules/landing/components/location/location.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [AboutSectionComponent, LocationComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {}
