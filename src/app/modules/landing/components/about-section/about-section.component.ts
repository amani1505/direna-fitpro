import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '@directive/reveal.directive';

@Component({
  selector: 'about-section',
  imports: [RouterLink, RevealDirective],
  templateUrl: './about-section.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './about-section.component.scss',
})
export class AboutSectionComponent {}
