import { Component } from '@angular/core';
import { PackagesPageviewComponent } from '../../page-sections/packages-pageview/packages-pageview.component';

@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [PackagesPageviewComponent],
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.scss',
})
export class PackagesComponent {}
