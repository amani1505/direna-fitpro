import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PackagesPageviewComponent } from '../../page-sections/packages-pageview/packages-pageview.component';

@Component({
  selector: 'app-packages',
  imports: [PackagesPageviewComponent],
  templateUrl: './packages.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './packages.component.scss',
})
export class PackagesComponent {}
